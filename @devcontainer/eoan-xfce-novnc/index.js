const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('eoan');

  devGenerator.setNodeVersion('current');
  devGenerator.updateGit();
  devGenerator.setDotnet();
  devGenerator.setCypress();
  devGenerator.setXfce();
  devGenerator.setNoVNC();
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
