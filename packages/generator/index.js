const {DevcontainerGenerator} = require('./dist/devcontainerGenerator');

const run = async () => {

    const devGenerator = new DevcontainerGenerator('eoan');
    const dockerFile = await devGenerator.generate();

    console.log(dockerFile);

}

run();




