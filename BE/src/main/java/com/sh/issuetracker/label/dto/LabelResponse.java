package com.sh.issuetracker.label.dto;

import com.sh.issuetracker.label.Label;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class LabelResponse {
	private final Long labelId;
	private final String name;
	private final String description;
	private final String backgroundColor;
	private final String fontColor;

	public static LabelResponse from(Label label) {
		return LabelResponse.builder()
			.labelId(label.getId())
			.name(label.getName())
			.description(label.getDescription())
			.backgroundColor(label.getBackgroundColor())
			.fontColor(label.getFontColorText())
			.build();
	}
}
