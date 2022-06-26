package com.sh.issuetracker.issue;

import com.sh.issuetracker.issue.dto.IssueLabelMapper;
import com.sh.issuetracker.issue.dto.IssueRequest;
import com.sh.issuetracker.issue.dto.IssueResponse;
import com.sh.issuetracker.issue.dto.IssueSearchRequest;
import com.sh.issuetracker.issue.search.IssueLabelDto;
import com.sh.issuetracker.issue.search.IssueSearchDto;
import com.sh.issuetracker.issue.search.IssueSearchParam;
import com.sh.issuetracker.issue.search.IssueSearchRepository;
import com.sh.issuetracker.user.AuthUser;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class IssueService {
	private final IssueRepository issueRepository;
	private final IssueSearchRepository issueSearchRepository;

	public List<IssueResponse.Row> readAllOf(AuthUser authUser, IssueStatus issueStatus) {
		List<Issue> issues = issueRepository.findAllByProjectIdAndStatus(
			authUser.getProjectId(),
			issueStatus);
		return toDto(issues);
	}

	public List<IssueResponse.Row> readAllOfAuthor(AuthUser authUser, IssueStatus issueStatus) {
		List<Issue> issues = issueRepository.findAllByProjectIdAndAuthorIdAndStatus(
			authUser.getProjectId(),
			authUser.getUserId(),
			issueStatus);
		return toDto(issues);
	}

	private List<IssueResponse.Row> toDto(List<Issue> issues) {
		return issues.stream()
			.map(IssueResponse.Row::from)
			.collect(Collectors.toList());
	}

	@Transactional
	public void update(IssueRequest request) {
		List<Issue> issues = issueRepository.findByIdIn(request.getIssueIds());
		issues.stream().forEach(Issue::changeStatus);
	}

	public List<IssueResponse.Row> search(AuthUser authUser, IssueSearchRequest request) {
		IssueSearchParam searchParam = IssueSearchParam.from(request);
		List<IssueLabelDto> issueLabels = null;
		if (searchParam.isNoneOrSearchedForLabel()) {
			issueLabels = issueSearchRepository.findIssueLabels(searchParam.labelName());
		}// else issueLabels = null

		List<IssueSearchDto> resultOfSearch = issueSearchRepository.search(
			authUser,
			searchParam,
			toIssueIds(issueLabels));

		IssueLabelMapper issueLabelMapper = IssueLabelMapper.from(issueLabels);
		return resultOfSearch.stream()
			.parallel()
			.map(issue -> IssueResponse.Row.from(issue, issueLabelMapper.getValue(issue.getIssueId())))
			.collect(Collectors.toList());
	}

	private List<Long> toIssueIds(List<IssueLabelDto> issueLabels) {
		if (Objects.isNull(issueLabels)) {
			return null;
		}
		return issueLabels.stream()
			.parallel()
			.map(IssueLabelDto::getIssueId)
			.collect(Collectors.toList());
	}
}
