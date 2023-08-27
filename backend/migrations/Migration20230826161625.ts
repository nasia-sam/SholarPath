import { Migration } from '@mikro-orm/migrations'

export class Migration20230826161625 extends Migration {
  async up (): Promise<void> {
    this.addSql('create table `course_program` (`id` varchar(255) not null, `slug` varchar(255) not null, `university` varchar(255) not null, `department` varchar(255) not null, `title` varchar(255) not null, `description` text not null, `open` tinyint(1) not null, `sitelink` varchar(255) not null, `grade_fields` json not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `course_program` add unique `course_program_slug_unique`(`slug`);')

    this.addSql('create table `call_for_submissions` (`id` varchar(255) not null, `open_from` datetime null, `close_at` datetime null, `documents` json not null, `state` enum(\'published\', \'open\', \'closed\', \'done\') not null, `course_program_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `call_for_submissions` add index `call_for_submissions_course_program_id_index`(`course_program_id`);')

    this.addSql('create table `candidate` (`id` varchar(255) not null, `name` varchar(255) not null, `surname` varchar(255) not null, `father_name` varchar(255) not null, `age` int not null, `address` varchar(255) not null, `zip_code` varchar(255) not null, `phone_number` varchar(255) not null, `email` varchar(255) not null, `bachelor_degree` varchar(255) not null, `part_time` tinyint(1) not null, `gender` enum(\'male\', \'female\', \'other\') not null, `attached_documents` json not null, `course_id` varchar(255) not null, `review` json null, `total_grade` int not null, `cfs_id` varchar(255) not null, `state` enum(\'submitted\', \'approved\', \'waitList\') not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `candidate` add index `candidate_cfs_id_index`(`cfs_id`);')

    this.addSql('create table `reference` (`token` varchar(255) not null, `title` varchar(255) null, `name` varchar(255) not null, `email` varchar(255) not null, `letter` text null, `expires_at` datetime not null, `submitted_at` datetime null, `candidate_id` varchar(255) not null, primary key (`token`)) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `reference` add index `reference_candidate_id_index`(`candidate_id`);')

    this.addSql('create table `user` (`id` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null, `name` varchar(255) not null, `is_admin` tinyint(1) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);')

    this.addSql('create table `roles` (`id` varchar(255) not null, `role` varchar(255) not null, `course_id` varchar(255) not null, `user_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `roles` add index `roles_course_id_index`(`course_id`);')
    this.addSql('alter table `roles` add index `roles_user_id_index`(`user_id`);')

    this.addSql('create table `invitation` (`id` varchar(255) not null, `email` varchar(255) not null, `invited_by_id` varchar(255) not null, `state` enum(\'SEND\', \'ACCEPTED\') not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `invitation` add index `invitation_invited_by_id_index`(`invited_by_id`);')

    this.addSql('alter table `call_for_submissions` add constraint `call_for_submissions_course_program_id_foreign` foreign key (`course_program_id`) references `course_program` (`id`) on update cascade;')

    this.addSql('alter table `candidate` add constraint `candidate_cfs_id_foreign` foreign key (`cfs_id`) references `call_for_submissions` (`id`) on update cascade;')

    this.addSql('alter table `reference` add constraint `reference_candidate_id_foreign` foreign key (`candidate_id`) references `candidate` (`id`) on update cascade;')

    this.addSql('alter table `roles` add constraint `roles_course_id_foreign` foreign key (`course_id`) references `course_program` (`id`) on update cascade on delete cascade;')
    this.addSql('alter table `roles` add constraint `roles_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade  on delete cascade;')

    this.addSql('alter table `invitation` add constraint `invitation_invited_by_id_foreign` foreign key (`invited_by_id`) references `user` (`id`) on update cascade;')
  }

  async down (): Promise<void> {
    this.addSql('alter table `call_for_submissions` drop foreign key `call_for_submissions_course_program_id_foreign`;')

    this.addSql('alter table `roles` drop foreign key `roles_course_id_foreign`;')

    this.addSql('alter table `candidate` drop foreign key `candidate_cfs_id_foreign`;')

    this.addSql('alter table `reference` drop foreign key `reference_candidate_id_foreign`;')

    this.addSql('alter table `roles` drop foreign key `roles_user_id_foreign`;')

    this.addSql('alter table `invitation` drop foreign key `invitation_invited_by_id_foreign`;')

    this.addSql('drop table if exists `course_program`;')

    this.addSql('drop table if exists `call_for_submissions`;')

    this.addSql('drop table if exists `candidate`;')

    this.addSql('drop table if exists `reference`;')

    this.addSql('drop table if exists `user`;')

    this.addSql('drop table if exists `roles`;')

    this.addSql('drop table if exists `invitation`;')
  }
}
