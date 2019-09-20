const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('disco');
  devGenerator.setNodeVersion('current');
  devGenerator.updateGit();
  devGenerator.setDotnet('2');
  devGenerator.setXfce();
  devGenerator.setRemoteDesktop();
  devGenerator.setZsh();
  devGenerator.setJava();
  devGenerator.setGradle();
  devGenerator.setKotlin();
  devGenerator.setAndroidsdk();

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
