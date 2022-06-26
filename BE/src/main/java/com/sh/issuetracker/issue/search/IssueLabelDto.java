package com.sh.issuetracker.issue.search;

import com.querydsl.core.annotations.QueryProjection;
import com.sh.issuetracker.label.TextColor;

import lombok.Getter;

@Getter
public class IssueLabelDto {
	private Long issueId;
	private String labelName;
	private String backgroundColor;
	private TextColor fontColor;

	@QueryProjection
	public IssueLabelDto(Long issueId, String labelName, String backgroundColor, TextColor fontColor) {
		this.issueId = issueId;
		this.labelName = labelName;
		this.backgroundColor = backgroundColor;
		this.fontColor = fontColor;
	}

	public String getFontColor() {
		return fontColor.toString();
	}
}
