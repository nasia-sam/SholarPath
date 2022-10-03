import { Migration } from '@mikro-orm/migrations'

export class Migration20221003121754 extends Migration {
  async up (): Promise<void> {
    this.addSql('alter table `call_for_submissions` add `attached_documents` json not null;')
    this.addSql('alter table `call_for_submissions` drop `documents`;')
  }

  async down (): Promise<void> {
    this.addSql('alter table `call_for_submissions` add `documents` text not null;')
    this.addSql('alter table `call_for_submissions` drop `attached_documents`;')
  }
}
