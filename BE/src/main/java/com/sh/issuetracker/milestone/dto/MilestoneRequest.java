package com.sh.issuetracker.milestone.dto;

import com.sh.issuetracker.milestone.Milestone;
import com.sh.issuetracker.project.Project;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class MilestoneRequest {
	@Getter
	@NoArgsConstructor
	public static class Creation {
		@NotBlank
		private String title;
		private LocalDate completionDate;
		@NotNull
		@Size(max = 50)
		private String description;

		public Milestone toMilestone(Project projectInfo) {
			return Milestone.builder()
				.milestoneTitle(this.title)
				.description(this.description)
				.project(projectInfo)
				.build();
		}
	}
}
