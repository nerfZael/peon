import { buildDependencyContainer } from "./di/buildDependencyContainer";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("custom-env").env(process.env.ENV);

const dependencyContainer = buildDependencyContainer();
const {
  peonClient,
} = dependencyContainer.cradle;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const argv = require("minimist")(process.argv.slice(2));

if (argv._ && argv._.length !== 0) {
  const command = argv._[0];

  (async () => {
    switch (command) {
      case "run":
        await peonClient.run(process.env.PEON_ADDRESS);
        break;
      default:
        console.log(`Command not found: ${command}.`);
        break;
    }
  })();
} else {
  console.log("No command specified.");
}
