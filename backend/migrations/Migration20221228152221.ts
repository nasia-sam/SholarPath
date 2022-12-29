import { Migration } from '@mikro-orm/migrations';

export class Migration20221228152221 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `reference` modify `expires_at` datetime not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `reference` modify `expires_at` datetime null;');
  }

}
