import { Migration } from '@mikro-orm/migrations'

export class Migration20230730192748 extends Migration {
  async up (): Promise<void> {
    this.addSql('drop table if exists `submission`;')
  }

  async down (): Promise<void> {
    this.addSql('create table `submission` (`id` varchar(255) not null, `state` json not null, `bachelor_relevance` int null, `research_field_relevance` int null, `bachelor_grade` int null, `thesis_grade` int null, `prerequisites_courses_grade` int null, `existance_of_other_diplomas` int null, `working_experience_relevance` int null, `interview` int null, `total_grade` int null, `candidate_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `submission` add unique `submission_candidate_id_unique`(`candidate_id`);')

    this.addSql('alter table `submission` add constraint `submission_candidate_id_foreign` foreign key (`candidate_id`) references `candidate` (`id`) on update cascade;')
  }
}
