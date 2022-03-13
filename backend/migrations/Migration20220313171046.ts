import { Migration } from '@mikro-orm/migrations'

export class Migration20220313171046 extends Migration {
  async up (): Promise<void> {
    this.addSql('create table `user` (`id` varchar(255) not null, `email` varchar(255) not null, `name` varchar(255) not null, `confirm_email` tinyint(1) not null, `confirmed_by_admin` tinyint(1) not null) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `user` add primary key `user_pkey`(`id`);')
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);')

    this.addSql('create table `course_program` (`id` varchar(255) not null, `slug` varchar(255) not null, `university` varchar(255) not null, `department` varchar(255) not null, `title` varchar(255) not null, `description` varchar(255) not null, `open` tinyint(1) not null, `sitelink` varchar(255) not null) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `course_program` add primary key `course_program_pkey`(`id`);')
    this.addSql('alter table `course_program` add unique `course_program_slug_unique`(`slug`);')

    this.addSql('create table `roles` (`id` varchar(255) not null, `role` varchar(255) not null, `course_id` varchar(255) not null, `user_id` varchar(255) not null) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `roles` add primary key `roles_pkey`(`id`);')
    this.addSql('alter table `roles` add index `roles_course_id_index`(`course_id`);')
    this.addSql('alter table `roles` add index `roles_user_id_index`(`user_id`);')

    this.addSql('create table `call_for_submissions` (`id` varchar(255) not null, `open_from` datetime null, `close_at` datetime null, `documents` text not null, `state` json not null, `course_program_id` varchar(255) not null) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `call_for_submissions` add primary key `call_for_submissions_pkey`(`id`);')
    this.addSql('alter table `call_for_submissions` add index `call_for_submissions_course_program_id_index`(`course_program_id`);')

    this.addSql('create table `submission` (`id` varchar(255) not null, `state` json not null, `bachelor_relevance` int(11) not null, `research_field_relevance` int(11) not null, `bachelor_grade` int(11) not null, `thesis_grade` int(11) not null, `prerequisites_courses_grade` int(11) not null, `existance_of_other_diplomas` int(11) not null, `working_experience_relevance` int(11) not null, `interview` int(11) not null, `total_grade` int(11) not null, `cfs_id` varchar(255) not null) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `submission` add primary key `submission_pkey`(`id`);')
    this.addSql('alter table `submission` add index `submission_cfs_id_index`(`cfs_id`);')

    this.addSql('create table `candidate` (`id` varchar(255) not null, `name` varchar(255) not null, `surname` varchar(255) not null, `father_name` varchar(255) not null, `age` int(11) not null, `address` varchar(255) not null, `zip_code` varchar(255) not null, `phone_number` varchar(255) not null, `email` varchar(255) not null, `bachelor_degree` varchar(255) not null, `part_time` tinyint(1) not null, `gender` varchar(255) not null, `cv` json not null, `course_id` varchar(255) not null, `submission_id` varchar(255) not null) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `candidate` add primary key `candidate_pkey`(`id`);')
    this.addSql('alter table `candidate` add index `candidate_submission_id_index`(`submission_id`);')
    this.addSql('alter table `candidate` add unique `candidate_submission_id_unique`(`submission_id`);')

    this.addSql('alter table `roles` add constraint `roles_course_id_foreign` foreign key (`course_id`) references `course_program` (`id`) on update cascade;')
    this.addSql('alter table `roles` add constraint `roles_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;')

    this.addSql('alter table `call_for_submissions` add constraint `call_for_submissions_course_program_id_foreign` foreign key (`course_program_id`) references `course_program` (`id`) on update cascade;')

    this.addSql('alter table `submission` add constraint `submission_cfs_id_foreign` foreign key (`cfs_id`) references `call_for_submissions` (`id`) on update cascade;')

    this.addSql('alter table `candidate` add constraint `candidate_submission_id_foreign` foreign key (`submission_id`) references `submission` (`id`) on update cascade;')
  }
}
