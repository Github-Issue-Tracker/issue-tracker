package com.sh.issuetracker.assignee;

import com.sh.issuetracker.issue.Issue;
import com.sh.issuetracker.project.Project;
import com.sh.issuetracker.user.User;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "issue_tracker_manager")
@Entity
public class Assignee {
	@EmbeddedId
	private AssigneeId id;

	@MapsId("userId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@MapsId("projectId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id")
	private Project project;

	@MapsId("issueId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "issue_id")
	private Issue issue;
}
