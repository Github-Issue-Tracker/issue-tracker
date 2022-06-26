package com.sh.issuetracker.assignee;

import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.EqualsAndHashCode;

@EqualsAndHashCode(of = {"userId", "projectId", "issueId"})
@Embeddable
public class AssigneeId implements Serializable {
	private Long userId;
	private Long projectId;
	private Long issueId;
}
