const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('ubuntu:disco');

  devGenerator.setNodeVersion('current');
  devGenerator.setUpgraded();
  devGenerator.updateGit();
  devGenerator.setDotnet();
  devGenerator.setDocker();
  devGenerator.setCypress();
  devGenerator.setXfce();
  devGenerator.setNoVNC();
  devGenerator.setZsh();

  await writeFile(
      `${__dirname}/Dockerfile`,
      await devGenerator.generateDockerfile()
  );
};

run();
