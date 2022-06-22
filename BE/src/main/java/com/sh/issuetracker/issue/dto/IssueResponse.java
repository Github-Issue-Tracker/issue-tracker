package com.sh.issuetracker.issue.dto;

import com.sh.issuetracker.issue.Issue;

import java.util.List;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class IssueResponse {
	@Getter
	@Builder(access = AccessLevel.PRIVATE)
	@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
	public static class Row {
		private final Long issueId;
		private final String issueTitle;
		private final String issueStatus;
		private final int issueNumber;
		private final String author;
		private final String createdAt;
		private final String milestoneTitle;
		private final List<String> labels;

		public static Row from(Issue issue) {
			return Row.builder()
				.issueId(issue.getId())
				.issueTitle(issue.getTitle())
				.issueStatus(issue.getStatus())
				.issueNumber(issue.getOrder())
				.author(issue.writer())
				.createdAt(issue.getCreatedAt())
				.milestoneTitle(issue.milestoneTitle())
				.labels(issue.labelNames())
				.build();
		}
	}
}
