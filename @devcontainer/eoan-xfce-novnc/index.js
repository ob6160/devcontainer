const loadTextFile = require('load-text-file');


const run = async ()=>{
    const text = await loadTextFile("../../node_modules/@devcontainer/dockerfiles/dist/deb-eoan/node-12.8.1/xfce4/novnc/zsh");
    console.log(text);
}

run();
