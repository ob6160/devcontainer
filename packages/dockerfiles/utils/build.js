const { spawn } = require('child_process');

const { NODE_VERSIONS } = require("./versions.json.js");
require('dotenv').config();

async function execute(){
    await build(NODE_VERSIONS[0]);
    await build(NODE_VERSIONS[1]);
}

execute();

async function build(NODE_VERSION) {
    await run(`echo ${process.env.DOCKER_PASS} | docker login --username ${process.env.DOCKER_USER} --password-stdin`);

    const nodeImageName = `zolika84/vscode-workspace:node-${NODE_VERSION}-stretch`;
    await run(`docker build --build-arg NODE_VERSION=${NODE_VERSION} ${__dirname}/node -t ${nodeImageName}`);
    run(`echo ${nodeImageName} > ${__dirname}/node/README.md`);    
    run(`docker push ${nodeImageName}`);    

    const dockerNodeImageName = `zolika84/vscode-workspace:docker-node-${NODE_VERSION}-stretch`;
    await run(`docker build --build-arg FROM_IMAGE=${nodeImageName} ${__dirname}/docker-node -t ${dockerNodeImageName}`)
    run(`echo ${dockerNodeImageName} > ${__dirname}/docker-node/README.md`);  
    run(`docker push ${dockerNodeImageName}`);   
    
    const dotnetDockerNodeImageName = `zolika84/vscode-workspace:dotnet-docker-node-${NODE_VERSION}-stretch`;
    await run(`docker build --build-arg FROM_IMAGE=${dockerNodeImageName} ${__dirname}/dotnet-docker-node -t ${dotnetDockerNodeImageName}`)
    run(`echo ${dotnetDockerNodeImageName} > ${__dirname}/dotnet-docker-node/README.md`);  
    run(`docker push ${dotnetDockerNodeImageName}`);    
    return 1;
}

async function run(command, options = {
    cwd: undefined,
    env: process.env
}) {

    return new Promise(async function (resolve, reject) {
        console.log(command);
        const child = spawn('sh', ['-c', command], options);

        for await (const data of child.stdout) {
            console.log(`${data}`);
        };

        child.on('error', error => {
            console.log(error)
        });

        child.on('exit', code => {
            if (code === 0) resolve();
            reject();
        });
    });
}


