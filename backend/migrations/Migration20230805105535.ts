import { Migration } from '@mikro-orm/migrations'

export class Migration20230805105535 extends Migration {
  async up (): Promise<void> {
    this.addSql('alter table `call_for_submissions` modify `state` enum(\'published\', \'open\', \'closed\', \'done\') not null;')

    this.addSql('alter table `candidate` add `state` enum(\'submitted\', \'approved\', \'waitList\') not null;')
  }

  async down (): Promise<void> {
    this.addSql('alter table `call_for_submissions` modify `state` enum(\'published\', \'open\', \'closed\') not null;')

    this.addSql('alter table `candidate` drop `state`;')
  }
}
