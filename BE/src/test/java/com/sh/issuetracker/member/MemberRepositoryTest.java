package com.sh.issuetracker.member;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

@ActiveProfiles("dev")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
class MemberRepositoryTest {

	private final MemberRepository memberRepository;

	public MemberRepositoryTest(@Autowired MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	@Test
	@DisplayName("담당자 있는 이슈 목록은 담당자 속한 팀의 멤버 정보로 이슈 조회 결과를 확인한다.")
	void test() {
		List<Member> actual = memberRepository.findByProjectId(1L);

		assertThat(actual).extracting("issues").isNotEmpty();

	}
}
