import { Migration } from '@mikro-orm/migrations';

export class Migration20221003155425 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `call_for_submissions` change `attached_documents` `documents` json not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `call_for_submissions` change `documents` `attached_documents` json not null;');
  }

}
