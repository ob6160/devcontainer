const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('disco');

  devGenerator.updateGit();
  devGenerator.setNodeVersion('current');
  devGenerator.setZsh();
  devGenerator.setDotnet(2);
  devGenerator.setNoVNC();
  devGenerator.setXfce();
  devGenerator.setCypress();

  await writeFile(
      `${__dirname}/Dockerfile`,
      await devGenerator.generateDockerfile()
  );
};

run();
