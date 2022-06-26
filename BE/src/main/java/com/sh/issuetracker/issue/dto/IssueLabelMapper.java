package com.sh.issuetracker.issue.dto;

import com.sh.issuetracker.issue.search.IssueLabelDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class IssueLabelMapper {
	private Map<Long, List<IssueResponse.LabelDesign>> labelMap = new HashMap<>();

	public static IssueLabelMapper from(List<IssueLabelDto> issueLabels) {
		IssueLabelMapper mapper = new IssueLabelMapper();
		if (Objects.isNull(issueLabels)) {
			return mapper;
		}
		for (IssueLabelDto issueLabel : issueLabels) {
			Long key = issueLabel.getIssueId();
			if (!mapper.labelMap.containsKey(key)) {
				mapper.labelMap.put(key, new ArrayList<>());
			}
			mapper.labelMap.get(key).add(new IssueResponse.LabelDesign(issueLabel));
		}
		return mapper;
	}

	public List<IssueResponse.LabelDesign> getValue(Long issueId) {
		return this.labelMap.containsKey(issueId) ? this.labelMap.get(issueId) : null;
	}
}
