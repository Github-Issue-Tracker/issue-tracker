package com.sh.issuetracker.milestone;

import static org.assertj.core.api.Assertions.assertThat;

import com.sh.issuetracker.project.Project;
import com.sh.issuetracker.project.ProjectRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

@ActiveProfiles("dev")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
public class MilestoneRepositoryTest {
	public static final long TEXT_PROJECT_ID = 1L;
	public static final String TEST_PROJECT_NAME = "프로젝트2";
	private final MilestoneRepository milestoneRepository;
	private final ProjectRepository projectRepository;

	private Project project;

	public MilestoneRepositoryTest(
		@Autowired MilestoneRepository milestoneRepository,
		@Autowired ProjectRepository projectRepository) {
		this.milestoneRepository = milestoneRepository;
		this.projectRepository = projectRepository;
	}

	@BeforeEach
	void beforeEach() {
		project = projectRepository.findById(TEXT_PROJECT_ID)
			.orElseThrow(()-> new RuntimeException("해당 프로젝트는 존재하지 않습니다."));
	}

	@Test
	@DisplayName("요청받은 마일스톤 데이터를 마일스톤 저장소에 저장됨을 확인한다.")
	void new_milestone_to_test_saving() {
		Milestone actual = milestoneRepository.save(getMilestone(project));
		Optional<Milestone> expected = milestoneRepository.findById(actual.getId());

		assertThat(expected.isPresent()).isTrue();
	}

	@Test
	@DisplayName("로그인한 사용자가 속한 프로젝트를 통해 마일스톤 목록을 조회해온다.")
	void read_milestone_list_by_fk_project_id() {
		Project testProject = projectRepository.save(getAnotherProject());
		milestoneRepository.save(getMilestone(testProject));

		List<Milestone> expected = milestoneRepository.findAllByProjectId(TEXT_PROJECT_ID);

		assertThat(expected).extracting("project.name").doesNotContain(TEST_PROJECT_NAME);
	}

	private Project getAnotherProject() {
		return new Project(TEST_PROJECT_NAME, "프로텍트2번");
	}

	private Milestone getMilestone(Project project) {
		return new Milestone("마일스톤 제목", "마일스톤 설명", project);
	}
}
