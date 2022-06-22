package com.sh.issuetracker.milestone.dto;

import com.sh.issuetracker.milestone.Milestone;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class MilestoneResponse {
	private final Long id;
	private final String title;
	private final String description;
	private final String completionDate;

	public static MilestoneResponse from(Milestone milestone) {
		return MilestoneResponse.builder()
			.id(milestone.getId())
			.title(milestone.getTitle())
			.description(milestone.getDescription())
			.completionDate(milestone.getCompletionDate())
			.build();
	}
}
