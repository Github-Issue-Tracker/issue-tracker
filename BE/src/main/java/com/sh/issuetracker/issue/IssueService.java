package com.sh.issuetracker.issue;

import com.sh.issuetracker.issue.dto.IssueResponse;
import com.sh.issuetracker.user.AuthUser;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class IssueService {
	private final IssueRepository issueRepository;

	public List<IssueResponse.Row> readAllOf(AuthUser authUser, IssueStatus issueStatus) {
		List<Issue> issues = issueRepository.findAllByProjectIdAndStatus(
			authUser.getProjectId(),
			issueStatus);
		return issues.stream()
			.map(IssueResponse.Row::from)
			.collect(Collectors.toList());
	}
}
