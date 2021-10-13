import { Connection } from 'typeorm';
import { name, internet } from 'faker';

export default class CreateUsers {
  public async run(connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          id: 1,
          name: name.firstName(),
          username: name.lastName(),
          password: internet.password(),
        },
        {
          id: 2,
          name: name.firstName(),
          username: name.lastName(),
          password: internet.password(),
        },
      ])
      .execute();
  }
}
