const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('buster');
  devGenerator.setNodeVersion('lts');
  devGenerator.updateGit();
  devGenerator.setAmplify();
  devGenerator.setZsh();

  const {
    Dockerfile,
    README,
  } = await devGenerator.generate();

  await writeFile(
      `${__dirname}/Dockerfile`, Dockerfile
  );

  await writeFile(`${__dirname}/README.md`, README);
};

run();
