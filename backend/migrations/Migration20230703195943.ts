import { Migration } from '@mikro-orm/migrations';

export class Migration20230703195943 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `candidate` add `total_grade` int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `candidate` drop `total_grade`;');
  }

}
