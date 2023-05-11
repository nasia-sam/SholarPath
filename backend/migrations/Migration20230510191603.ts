import { Migration } from '@mikro-orm/migrations';

export class Migration20230510191603 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `password` varchar(255) not null;');

    this.addSql('alter table `invitation` modify `state` enum(\'SEND\', \'ACCEPTED\') not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `password`;');

    this.addSql('alter table `invitation` modify `state` tinyint not null;');
  }

}
