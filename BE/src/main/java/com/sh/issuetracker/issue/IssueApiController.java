package com.sh.issuetracker.issue;

import com.sh.issuetracker.issue.dto.IssueResponse;
import com.sh.issuetracker.user.AuthUser;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/issue-tracker/issues")
public class IssueApiController {
	private final IssueService issueService;

	@GetMapping(value = {"/","/open"})
	public ResponseEntity<Void> readAllWithOpen() {
		List<IssueResponse.Row> response = issueService.readAllOf(AuthUser.of(), IssueStatus.OPEN);
		return ResponseEntity.ok().build();
	}
}
