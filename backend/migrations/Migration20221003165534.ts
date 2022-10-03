import { Migration } from '@mikro-orm/migrations'

export class Migration20221003165534 extends Migration {
  async up (): Promise<void> {
    this.addSql('alter table `candidate` modify `referencies` json null;')
  }

  async down (): Promise<void> {
    this.addSql('alter table `candidate` modify `referencies` json not null;')
  }
}
