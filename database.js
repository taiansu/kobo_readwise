import knex from 'knex';
import { existsSync } from 'fs';

const db_path = process.plateform === 'win32' ? '' : '/Volumes/KOBOeReader/.kobo/KoboReader.sqlite';

if (!existsSync(db_path)) {
  console.log("Cannot find KOBOeReader's data. Please make sure you connect the device properly.\n\n")
  process.exit(1);
}

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: db_path
  },
  useNullAsDefault: true
})

export default database;
