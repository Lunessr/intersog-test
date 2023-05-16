import { exec } from 'child_process';

let command;

switch (process.argv[2]) {
  case 'generate':
    command = `npm run typeorm migration:generate ./src/modules/database/migrations/${process.argv[3]} -- -d ./src/configs/migration.config.ts`;
    break;

  case 'create':
    command = `npm run typeorm migration:create ./src/modules/database/migrations/${process.argv[3]}`;
    break;

  case 'run':
    command = `npm run build && npm run typeorm migration:run -- -d ./src/configs/migration.config.ts`;
    break;

  case 'revert':
    command = `npm run typeorm migration:revert -- -d ./src/configs/migration.config.ts`;
}

exec(command, (error, stdout, stderr) => {
  if (error !== null) {
    console.error(stderr);
  }
  console.log(stdout);
});
