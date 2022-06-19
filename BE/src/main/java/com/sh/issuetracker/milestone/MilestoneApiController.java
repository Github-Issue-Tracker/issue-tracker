package com.sh.issuetracker.milestone;

import com.sh.issuetracker.milestone.MilestoneService;
import com.sh.issuetracker.milestone.dto.MilestoneRequest;
import com.sh.issuetracker.milestone.dto.MilestoneResponse;
import com.sh.issuetracker.user.AuthUser;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import javax.validation.Valid;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/issue-tracker/milestones")
public class MilestoneApiController {
	private final MilestoneService milestoneService;

	@GetMapping("/list")
	public ResponseEntity<List<MilestoneResponse>> readAll() {
		List<MilestoneResponse> milestoneResponses = milestoneService.readAll(AuthUser.of());
		return ResponseEntity.ok().body(milestoneResponses);
	}

	@PostMapping
	public ResponseEntity<MilestoneResponse> create(@Valid @RequestBody MilestoneRequest.Creation creationRequest) {
		MilestoneResponse milestoneResponse = milestoneService.create(creationRequest, AuthUser.of());
		return ResponseEntity.ok().body(milestoneResponse);
	}
}
