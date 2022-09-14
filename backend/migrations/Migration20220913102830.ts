import { Migration } from '@mikro-orm/migrations'

export class Migration20220913102830 extends Migration {
  async up (): Promise<void> {
    this.addSql('alter table `candidate` modify `gender` enum(\'male\', \'female\', \'other\') not null, modify `cv` text null;')
  }

  async down (): Promise<void> {
    this.addSql('alter table `candidate` modify `gender` enum(\'M\', \'F\', \'O\') not null, modify `cv` text not null;')
  }
}
