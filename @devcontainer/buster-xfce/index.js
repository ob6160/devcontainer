const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile, readFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('buster');

  devGenerator.setNodeVersion('current');
  devGenerator.setUpgraded();
  devGenerator.updateGit();
  devGenerator.setDotnet();
  devGenerator.setCypress();
  devGenerator.setXfce();
  devGenerator.setRemoteDesktop();
  devGenerator.setZsh();

  const {
    Dockerfile,
    README,
  } = await devGenerator.generate();

  await writeFile(
      `${__dirname}/.devimage/Dockerfile`, Dockerfile
  );

  await writeFile(`${__dirname}/README.MD`, README);



  const devComposeFile = await readFile(`${__dirname}/.devcontainer/Dockerfile`).catch((e)=>console.error({e}));
  const [, ...rest] = [...devComposeFile.toString().split('\n')];
  const dockerfileForcompose = [`FROM devimages\\${process.env.npm_package_tagname}:${process.env.npm_package_version}`, ...rest].join(('\n'));
  await writeFile(`${__dirname}/.devcontainer/Dockerfile`, dockerfileForcompose)
};

run();
