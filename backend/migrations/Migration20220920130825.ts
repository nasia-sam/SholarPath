import { Migration } from '@mikro-orm/migrations';

export class Migration20220920130825 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `submission` modify `bachelor_relevance` int null, modify `research_field_relevance` int null, modify `bachelor_grade` int null, modify `thesis_grade` int null, modify `prerequisites_courses_grade` int null, modify `existance_of_other_diplomas` int null, modify `working_experience_relevance` int null, modify `interview` int null, modify `total_grade` int null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `submission` modify `bachelor_relevance` int not null, modify `research_field_relevance` int not null, modify `bachelor_grade` int not null, modify `thesis_grade` int not null, modify `prerequisites_courses_grade` int not null, modify `existance_of_other_diplomas` int not null, modify `working_experience_relevance` int not null, modify `interview` int not null, modify `total_grade` int not null;');
  }

}
