package com.sh.issuetracker.issue;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
	@EntityGraph(value = "Issue.all", type = EntityGraph.EntityGraphType.LOAD)
	List<Issue> findAllByProjectIdAndStatus(Long projectId, IssueStatus status);
}
