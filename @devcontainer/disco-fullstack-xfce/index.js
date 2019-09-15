const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('disco');
  devGenerator.setNodeVersion('current');
  devGenerator.updateGit();
  devGenerator.setDotnet('2');
  devGenerator.setCypress();
  devGenerator.setXfce();
  devGenerator.setremoteDesktop();
  devGenerator.setZsh();

  const {
    Dockerfile,
    README,
  } = await devGenerator.generate();

  await writeFile(
      `${__dirname}/Dockerfile`, Dockerfile
  );

  await writeFile(`${__dirname}/README.MD`, README);
};

run();
