const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises


const run = async () => {

    const devGenerator = new DevcontainerGenerator('eoan');

    devGenerator.setNodeVersion('12.8.1');

    await writeFile(`${__dirname}/Dockerfile`, await devGenerator.generate());
   
}

run();




