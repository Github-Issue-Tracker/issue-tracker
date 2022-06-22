package com.sh.issuetracker.member;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
	@EntityGraph(value = "Member.all", type = EntityGraph.EntityGraphType.FETCH)
	List<Member> findByProjectId(Long projectId);
}
