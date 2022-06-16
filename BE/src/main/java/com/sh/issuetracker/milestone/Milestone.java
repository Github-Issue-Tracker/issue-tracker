package com.sh.issuetracker.milestone;

import com.sh.issuetracker.milestone.dto.MilestoneResponse;
import com.sh.issuetracker.project.Project;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString(exclude = "project")
@EqualsAndHashCode(of = "milestoneId")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "issue_tracker_milestone")
@Entity
public class Milestone {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long milestoneId;

	private String milestoneTitle;
	private String description;
	private LocalDateTime completionDate;
	@Column(name = "deleted")
	private boolean isDeleted;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id")
	private Project project;

	@Builder
	public Milestone(String milestoneTitle, String description, Project project) {
		this.milestoneTitle = milestoneTitle;
		this.description = description;
		this.completionDate = LocalDateTime.now();
		this.isDeleted = false;
		this.project = project;
	}

	MilestoneResponse toDto() {
		return MilestoneResponse.builder()
			.id(this.milestoneId)
			.title(this.milestoneTitle)
			.description(this.description)
			.completionDate(this.completionDate.toString())
			.build();
	}

	Long getId() {
		return this.milestoneId;
	}
}
