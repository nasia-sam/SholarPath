import { Migration } from '@mikro-orm/migrations';

export class Migration20221108184638 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `reference` (`token` varchar(255) not null, `title` varchar(255) null, `name` varchar(255) not null, `email` varchar(255) not null, `letter` text null, `expires_at` datetime null, `submitted_at` datetime null, `candidate_id` varchar(255) not null, primary key (`token`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `reference` add index `reference_candidate_id_index`(`candidate_id`);');

    this.addSql('alter table `reference` add constraint `reference_candidate_id_foreign` foreign key (`candidate_id`) references `candidate` (`id`) on update cascade;');

    this.addSql('alter table `candidate` drop `referencies`;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `reference`;');

    this.addSql('alter table `candidate` add `referencies` json null;');
  }

}
