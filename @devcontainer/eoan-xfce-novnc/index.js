const {DevcontainerGenerator} = require('@devcontainer/generator');



const run = async () => {

    const devGenerator = new DevcontainerGenerator('eoan');

    devGenerator.setNodeVersion('12.8.1');

    // devGenerator
    const dockerFile = await devGenerator.generate();
   
    console.log(dockerFile);
}

run();




