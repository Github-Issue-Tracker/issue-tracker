package com.sh.issuetracker.issue.search;

import java.util.HashMap;
import java.util.Map;

public class SearchWordMap {
	private Map<SearchKeyType, String> searchWords = new HashMap<>();

	public SearchWordMap() {
		searchWords = new HashMap<>();
		searchWords.put(SearchKeyType.AUTHOR, "");
		searchWords.put(SearchKeyType.ASSIGNEE, "");
		searchWords.put(SearchKeyType.MILESTONE, "");
		searchWords.put(SearchKeyType.LABEL, "");
	}

	public void add(SearchKeyType key, String value) {
		searchWords.replace(key, value);
	}

	public String get(SearchKeyType key) {
		return searchWords.get(key);
	}
}
