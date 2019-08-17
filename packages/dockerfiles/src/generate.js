"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const version = process.env.npm_package_version;
function str_r(input) {
    if (!input)
        return input;
    const items = [{ key: '{ZED_VERSION}', value: '1.0.0' }, { key: '.templates', value: 'dist' }];
    items.forEach((item) => { input = input.replace(item.key, item.value); });
    return input;
}
const processed = {};
async function writeResult(imagenameStack, parentReadMes, parentDockers) {
    const stack = imagenameStack.join('-');
    if (processed[stack] === true)
        return true; // do  not process the same stack twice
    processed[stack] = true;
    const newPath = str_r(imagenameStack.join('/'));
    const Dockerfile = str_r(parentDockers.pop());
    parentDockers.push(Dockerfile);
    const readme = str_r(parentReadMes.pop());
    parentReadMes.push(readme);
    await fs_1.promises.mkdir(newPath, { recursive: true });
    const imageName = newPath.replace(/\//g, '-').replace('dist-', '');
    //await fs.writeFile(`${newPath}/build.sh`, `docker build . -t zolika84/${imageName}`);
    //await fs.writeFile(`${newPath}/build-full.sh`, `docker build -f full.Dockerfile . -t zolika84/${imageName}`);
    if (!imagenameStack.includes('dotnet') &&
        (!imagenameStack.includes('amplify-1.12.0') || !imagenameStack.includes('dotnet_buster')) &&
        (!imagenameStack.includes('amplify-1.12.0') || !imagenameStack.includes('cypress-3.4.1'))) {
        await fs_1.promises.writeFile(`${newPath}/push.sh`, `yarn generate && cd ../zsh && docker build . -t zolika84/devcontainer:${version}-${imageName} && docker push zolika84/devcontainer:${version}-${imageName}`);
        // await fs.writeFile(`${newPath}/push.sh`, `yarn generate && cd ../zsh && docker run --rm -it --name img --volume $(pwd):/home/user/src:ro --workdir /home/user/src --volume "\${HOME}/.docker:/root/.docker:ro" --security-opt seccomp=unconfined --security-opt apparmor=unconfined r.j3ss.co/img build -t zolika84/devcontainer:${version}-${imageName} . && docker push zolika84/devcontainer:${version}-${imageName}`);
        let fromImageName = newPath.substring(0, newPath.lastIndexOf('/'));
        fromImageName = fromImageName.replace(/\//g, '-').replace('dist-', '');
        const newDocker = parentDockers.length > 1 ? `
    FROM zolika84/${fromImageName}:${version}\r\n\r\n` : '';
        //await fs.writeFile(`${newPath}/Dockerfile`, `${newDocker}${Dockerfile}`);
        await fs_1.promises.writeFile(`${newPath}/Dockerfile`, `### zolika84/devcontainer:${version}-${imageName}
######
` +
            parentDockers.join('\n\n'));
        const newReadme = `# zolika84/devcontainer:${version}-${imageName}\r\n`;
        await fs_1.promises.writeFile(`${newPath}/README.md`, `## ${newReadme}${readme}`);
    }
    if (imagenameStack.length > 3) {
        // let currentPath = imagenameStack.pop()!;
        // let readme = parentReadMes.pop()!;
        // let docker = parentDockers.pop()!;
        // parentReadMes.pop()!;
        // imagenameStack.pop()!;
        // parentDockers.pop()!;
        let cutOut = 3;
        while (cutOut < parentDockers.length) {
            await writeResult(cutout(imagenameStack, cutOut), cutout(parentReadMes, cutOut), cutout(parentDockers, cutOut));
            cutOut++;
        }
        // parentReadMes.push(readme);
        // imagenameStack.push(currentPath);
        // parentDockers.push(docker);
        // await writeResult(imagenameStack, parentReadMes, parentDockers);
    }
    return true;
}
exports.writeResult = writeResult;
function cutout(arr, element) {
    return arr.slice(0, element - 1).concat(arr.slice(element));
}
async function run(root) {
    let result = [];
    const generate = async (dir, actual, parent, parentReadMes, imagenameStack, parentDockers) => {
        let dockerfile = "";
        let readme = "";
        let variants = { key: '', values: [], rename: '' };
        let versions = false;
        const dirs = [];
        await Promise.all(dir.map(async (element) => {
            const path = `${parent}/${actual}/${element.name}`;
            if (element.isDirectory()) {
                dirs.push(element.name);
            }
            if (element.name === 'Dockerfile') {
                dockerfile = String(await fs_1.promises.readFile(path));
            }
            if (element.name === 'README.md') {
                readme = String(await fs_1.promises.readFile(path));
            }
            if (element.name === 'versions.json') {
                versions = true;
                variants = await JSON.parse(String(await fs_1.promises.readFile(path)));
            }
        }));
        await Promise.all(dirs.map(async (elementName) => {
            const tempaltesDir = await fs_1.promises.readdir(`${parent}/${actual}/${elementName}`, { withFileTypes: true });
            if (versions) {
                const { key, values, rename } = variants;
                return await doVariants(parent);
                async function doVariants(parent) {
                    return await Promise.all(values.map(async (value) => {
                        const filledDockerFile = dockerfile.replace(variants.key, value);
                        return await generate(tempaltesDir, elementName, `${parent}/${actual}`, [...parentReadMes, readme], [...imagenameStack, `${actual}-${value}`], [...parentDockers, filledDockerFile]);
                    }));
                }
            }
            else {
                return await generate(tempaltesDir, elementName, `${parent}/${actual}`, [...parentReadMes, readme], [...imagenameStack, `${actual}`], [...parentDockers, dockerfile]);
            }
        }));
        // if (!versions) {
        const path = imagenameStack.join('/');
        if (dockerfile) {
            if (versions) {
                return await Promise.all(variants.values.map(async (value) => {
                    const filledDockerFile = dockerfile.replace(variants.key, value);
                    result.push({ imagenameStack: [...imagenameStack, `${actual}-${value}`], parentReadMes: [...parentReadMes, readme], parentDockers: [...parentDockers, filledDockerFile] });
                }));
            }
            else {
                result.push({ imagenameStack: [...imagenameStack, actual], parentReadMes: [...parentReadMes, readme], parentDockers: [...parentDockers, dockerfile] });
            }
        }
        else {
            result.push({ imagenameStack: imagenameStack, parentReadMes: parentReadMes, parentDockers: parentDockers });
        }
    };
    const tempaltesDir = await fs_1.promises.readdir(root, { withFileTypes: true });
    await generate(tempaltesDir, root, '.', [], [], []);
    return result;
}
exports.run = run;
