import { Migration } from '@mikro-orm/migrations'

export class Migration20230502184021 extends Migration {
  async up (): Promise<void> {
    this.addSql('alter table `user` change `confirmed_by_admin` `is_admin` tinyint(1) not null;')
  }

  async down (): Promise<void> {
    this.addSql('alter table `user` change `is_admin` `confirmed_by_admin` tinyint(1) not null;')
  }
}
