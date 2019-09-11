const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('disco');
  
  
  devGenerator.setNodeVersion('current');
  devGenerator.updateGit();
  devGenerator.setDotnet('2');
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