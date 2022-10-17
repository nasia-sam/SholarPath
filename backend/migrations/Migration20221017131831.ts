import { Migration } from '@mikro-orm/migrations'

export class Migration20221017131831 extends Migration {
  async up (): Promise<void> {
    this.addSql('alter table `course_program` add `grade_fields` json not null;')

    this.addSql('alter table `candidate` add `review` json null;')
  }

  async down (): Promise<void> {
    this.addSql('alter table `course_program` drop `grade_fields`;')

    this.addSql('alter table `candidate` drop `review`;')
  }
}
