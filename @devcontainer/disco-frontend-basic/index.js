const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('ubuntu:disco');

  devGenerator.updateGit();
  devGenerator.setNodeVersion('current');
  devGenerator.setZsh();

  await writeFile(
      `${__dirname}/Dockerfile`,
      await devGenerator.generateDockerfile()
  );
};

run();
