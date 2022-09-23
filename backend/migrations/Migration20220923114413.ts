import { Migration } from '@mikro-orm/migrations';

export class Migration20220923114413 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `submission` drop foreign key `submission_cfs_id_foreign`;');

    this.addSql('alter table `candidate` add `cfs_id` varchar(255) not null;');
    this.addSql('alter table `candidate` add constraint `candidate_cfs_id_foreign` foreign key (`cfs_id`) references `call_for_submissions` (`id`) on update cascade;');
    this.addSql('alter table `candidate` add index `candidate_cfs_id_index`(`cfs_id`);');

    this.addSql('alter table `submission` drop index `submission_cfs_id_index`;');
    this.addSql('alter table `submission` drop `cfs_id`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `candidate` drop foreign key `candidate_cfs_id_foreign`;');

    this.addSql('alter table `candidate` drop index `candidate_cfs_id_index`;');
    this.addSql('alter table `candidate` drop `cfs_id`;');

    this.addSql('alter table `submission` add `cfs_id` varchar(255) not null;');
    this.addSql('alter table `submission` add constraint `submission_cfs_id_foreign` foreign key (`cfs_id`) references `call_for_submissions` (`id`) on update cascade;');
    this.addSql('alter table `submission` add index `submission_cfs_id_index`(`cfs_id`);');
  }

}
