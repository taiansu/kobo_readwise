import knex from 'knex';
import { existsSync } from 'fs';
import { execSync } from 'child_process';

const dbPath = getDBPath(process.platform);

if (!existsSync(dbPath)) {
  console.log("\n❌ Cannot find KOBOeReader's data. Please make sure you connect the device properly.\n\n")
  process.exit(1);
}

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: dbPath
  },
  useNullAsDefault: true
})

function getDBPath(platform) {
  switch (platform) {
    case 'win32':
      let drive = getKOBODrive();
      return `${drive}/.kobo/KoboReader.sqlite`;
    default:
      return '/Volumes/KOBOeReader/.kobo/KoboReader.sqlite'
  }
}

function getKOBODrive() {
  return execSync('wmic logicaldisk get Name, VolumeName')
           .toString()
           .split('\r\r\n')
           .map(row => row.trim().split(/\s+/))
           .filter(([_drive, desc]) => desc === 'KOBOeReader')
           .map(([drive]) => drive)[0];
}

export default database;
