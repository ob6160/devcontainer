const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('debian:stretch-slim');

  devGenerator.updateGit();
  devGenerator.setNodeVersion('current');
  devGenerator.setCypress();
  devGenerator.setDotnet();
  devGenerator.setNoVNC();
  devGenerator.setZsh();

  await writeFile(
      `${__dirname}/Dockerfile`,
      await devGenerator.generateDockerfile()
  );
};

run();
