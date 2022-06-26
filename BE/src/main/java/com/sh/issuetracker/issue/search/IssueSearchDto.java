package com.sh.issuetracker.issue.search;

import com.querydsl.core.annotations.QueryProjection;
import com.sh.issuetracker.issue.IssueStatus;

import org.apache.logging.log4j.util.Strings;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class IssueSearchDto {
	private Long issueId;
	private String issueTitle;
	private IssueStatus issueStatus;
	private int issueOrder;
	private LocalDateTime created;
	private String nickName;
	private String image;
	private String milestoneTitle;

	@QueryProjection
	public IssueSearchDto(
		Long issueId,
		String issueTitle,
		IssueStatus issueStatus,
		int issueOrder,
		LocalDateTime created,
		String nickName,
		String image,
		String milestoneTitle) {
		this.issueId = issueId;
		this.issueTitle = issueTitle;
		this.issueStatus = issueStatus;
		this.issueOrder = issueOrder;
		this.created = created;
		this.nickName = nickName;
		this.image = image;
		this.milestoneTitle = milestoneTitle;
	}

	public String status() {
		return issueStatus.toString();
	}

	public String getCreated() {
		return created.toString();
	}

	public String milestoneTitle() {
		return Strings.isBlank(this.milestoneTitle) ? "" : milestoneTitle;
	}

}
