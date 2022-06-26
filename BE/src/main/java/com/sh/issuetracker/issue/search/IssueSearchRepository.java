package com.sh.issuetracker.issue.search;

import static com.sh.issuetracker.assignee.QAssignee.assignee;
import static com.sh.issuetracker.issue.QIssue.issue;
import static com.sh.issuetracker.issuelabel.QIssueLabel.issueLabel;
import static com.sh.issuetracker.label.QLabel.label;
import static com.sh.issuetracker.milestone.QMilestone.milestone;
import static com.sh.issuetracker.project.QProject.project;
import static com.sh.issuetracker.user.QUser.user;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sh.issuetracker.issue.IssueStatus;
import com.sh.issuetracker.user.AuthUser;

import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

@Repository
public class IssueSearchRepository {
	private final JPAQueryFactory queryFactory;

	public IssueSearchRepository(EntityManager entityManager) {
		this.queryFactory = new JPAQueryFactory(entityManager);
	}

	public List<IssueSearchDto> search(
		AuthUser authUser,
		IssueSearchParam searchWord,
		List<Long> issueIds) {
		List<IssueSearchDto> issues = queryFactory.select(new QIssueSearchDto(
				issue.id.as("issueId"),
				issue.title.as("issueTitle"),
				issue.status.as("issueStatus"),
				issue.order.as("issueOrder"),
				issue.createdAt,
				user.nickName,
				user.image,
				milestone.milestoneTitle
			)).from(issue)
			.innerJoin(issue.author, user)
			.innerJoin(issue.project, project)
			.leftJoin(milestone).on(issue.milestone.id.eq(milestone.id))    // milestoneId is nullable
			.where(
				issue.project.id.eq(authUser.getProjectId()),
				issueStatus(searchWord.status()),
				authorFrom(searchWord.author()),
				milestoneFrom(searchWord.milestoneTitle()),
				labelsFrom(searchWord.labelName(), issueIds),  // TODO issueIds 만 전달하면 돼
				assigneeFrom(searchWord.assignee())
			).fetch();
		return issues;
	}

	public List<IssueIdsBySearchDto> searchByLabelName(String labelName) {
		return queryFactory
			.select(new QIssueIdsBySearchDto(
				issueLabel.issue.id))
			.from(issueLabel)
			.where(getLabelNameEq(labelName))
			.fetch();
	}

	/**
	 * 검색어 없으면, issueId 관련된 label 모두 가져온다.
	 * 검색어가 있으면, 해당 IssuedId와 label들을 가져온다.
	 * label:none 검색조건은 label 을 조회할 필요가 없다.
	 * @param labelName
	 * @return
	 */
	public List<IssueLabelDto> findIssueLabels(String labelName) {
		return queryFactory
			.select(new QIssueLabelDto(
				issueLabel.issue.id,
				label.name,
				label.backgroundColor,
				label.fontColor
			))
			.from(issueLabel)
			.innerJoin(issueLabel.label, label)
			.where(getLabelNameEq(labelName))
			.fetch();
	}

	/**
	 * private ? - 이슈목록에서 담당자 이름은 쓰이지 않는다.
	 * @param assigneeName
	 * @return
	 */
	private List<IssueIdsBySearchDto> searchByAssignee(String assigneeName) {
		return queryFactory
			.select(new QIssueIdsBySearchDto(
				assignee.issue.id))
			.from(assignee)
			.where(getAssigneeFrom(assigneeName))
			.fetch();
	}

	private BooleanExpression labelsFrom(String labelName, List<Long> issueIds) {
		if (SearchKeyType.isNone(labelName)) {
			return issue.id.notIn(issueIds);
		}
		return Strings.isBlank(labelName) ? null : issue.id.in(issueIds);
	}

	private BooleanExpression assigneeFrom(String assigneeName) {
		List<Long> issueIds = getIssueIds(searchByAssignee(assigneeName));
		if (SearchKeyType.isNone(assigneeName)) {
			return issue.id.notIn(issueIds);
		}
		return Strings.isBlank(assigneeName) ? null : issue.id.in(issueIds); // TODO
	}

	private List<Long> getIssueIds(List<IssueIdsBySearchDto> issueIdsBySearchDto) {
		return issueIdsBySearchDto.stream()
			.map(IssueIdsBySearchDto::getIssueId)
			.collect(Collectors.toList());
	}

	private BooleanExpression issueStatus(IssueStatus status) {
		return issue.status.eq(status);
	}

	private BooleanExpression authorFrom(String authorName) {
		return Strings.isBlank(authorName) ? null : user.nickName.eq(authorName);
	}

	// issue 내 milestone_id는 null 야니면 id 가 있는데
	// - 여기서는 null 은 검색 조건에 안들어가고 milestone의 모든 경우가 조회 결과로 나온다.
	private BooleanExpression milestoneFrom(String milestoneTitle) {
		if (SearchKeyType.NONE.equals(milestoneTitle)) {
			return milestone.milestoneTitle.isNull();
		}
		return Strings.isBlank(milestoneTitle) ? null : milestone.milestoneTitle.eq(milestoneTitle);
	}

	private BooleanExpression getAssigneeFrom(String assigneeName) {
		return SearchKeyType.isNone(assigneeName) ? null : assignee.user.nickName.eq(assigneeName);
	}

	private BooleanExpression getLabelNameEq(String labelName) {
		return SearchKeyType.isNone(labelName) ? null : issueLabel.label.name.eq(labelName);
	}
}
