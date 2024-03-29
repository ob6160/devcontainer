const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile, readFile} = require('fs').promises;

const tagname = process.env.npm_package_tagname;
const version = process.env.npm_package_version;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('buster');

  devGenerator.setNodeVersion('current');
  devGenerator.updateGit();
  devGenerator.setDotnet();
  devGenerator.setCypress();
  devGenerator.setChrome();
  devGenerator.setZsh();

  const {
    Dockerfile,
    README,
  } = await devGenerator.generate();

  await writeFile(
      `${__dirname}/.devimage/Dockerfile`, Dockerfile
  );

  await writeFile(`${__dirname}/.devimage/README.md`, README);

  const devComposeFile =
    await readFile(`${__dirname}/.devcontainer/Dockerfile`)
        .catch((e) => console.error({e}));

  const [, ...rest] = [...devComposeFile.toString().split('\n')];

  const dockerfileForcompose =
    [`FROM devimages/${tagname}:${version}`,
      ...rest].join(('\n'));
  await writeFile(`${__dirname}/.devcontainer/Dockerfile`,
      dockerfileForcompose);
};

run();
