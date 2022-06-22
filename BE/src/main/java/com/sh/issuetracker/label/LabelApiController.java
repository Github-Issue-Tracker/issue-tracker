package com.sh.issuetracker.label;

import com.sh.issuetracker.label.dto.LabelRequest;
import com.sh.issuetracker.label.dto.LabelResponse;
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
@RequestMapping("/api/issue-tracker/labels")
public class LabelApiController {
	private final LabelService labelService;

	@PostMapping
	public ResponseEntity<LabelResponse> store(@Valid @RequestBody LabelRequest.Creation request) {
		LabelResponse labelResponse = labelService.create(request, AuthUser.of());
		return ResponseEntity.ok().body(labelResponse);
	}

	@GetMapping
	public ResponseEntity<List<LabelResponse>> readAll() {
		List<LabelResponse> labelResponses = labelService.readAll(AuthUser.of());
		return ResponseEntity.ok().body(labelResponses);
	}
}
