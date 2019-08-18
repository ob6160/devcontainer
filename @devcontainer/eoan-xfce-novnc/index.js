const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises


const run = async () => {

    const devGenerator = new DevcontainerGenerator('eoan');

    devGenerator.setNodeVersion('12.8.1');

    // devGenerator
    const dockerFile = await devGenerator.generate();
    await writeFile(`${__dirname}/Dockerfile`, dockerFile);
   
    console.log(dockerFile);
}

run();




