import { Migration } from '@mikro-orm/migrations'

export class Migration20230502200734 extends Migration {
  async up (): Promise<void> {
    this.addSql('create table `invitation` (`id` varchar(255) not null, `email` varchar(255) not null, `invited_by_id` varchar(255) not null, `state` tinyint not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;')
    this.addSql('alter table `invitation` add index `invitation_invited_by_id_index`(`invited_by_id`);')

    this.addSql('alter table `invitation` add constraint `invitation_invited_by_id_foreign` foreign key (`invited_by_id`) references `user` (`id`) on update cascade;')

    this.addSql('alter table `user` drop `confirm_email`;')
  }

  async down (): Promise<void> {
    this.addSql('drop table if exists `invitation`;')

    this.addSql('alter table `user` add `confirm_email` tinyint(1) not null;')
  }
}
