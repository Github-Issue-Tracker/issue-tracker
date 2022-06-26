package com.sh.issuetracker.issue.search;

import com.querydsl.core.annotations.QueryProjection;

import lombok.AccessLevel;
import lombok.Getter;

@Getter(AccessLevel.PACKAGE)
public class IssueIdsBySearchDto {
	private Long issueId;

	@QueryProjection
	public IssueIdsBySearchDto(Long issueId) {
		this.issueId = issueId;
	}
}
