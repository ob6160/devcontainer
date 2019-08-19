const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises

const run = async () => {

    const devGenerator = new DevcontainerGenerator('stretch');

    devGenerator.setNodeVersion('12.8.1');
    devGenerator.updateGit();
    // devGenerator.setXfce();
    devGenerator.setNoVNC();
    devGenerator.setZsh();

    await writeFile(`${__dirname}/Dockerfile`, await devGenerator.generate());
   
}

run();




