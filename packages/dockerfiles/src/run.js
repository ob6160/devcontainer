"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = require("./generate");
const main = async (inputFolder) => {
    let results = await generate_1.run(inputFolder);
    results = results.filter((x) => x.imagenameStack.includes('zsh'));
    // results = results.filter((x: any) => x.imagenameStack.includes('deb-buster'));
    // results = results.filter((x: any)=> x.imagenameStack.includes('node-12.8.1'));
    // results = results.filter((x: any) => !x.imagenameStack.includes('bash'));
    //Working from just this folders
    results.map((r) => console.log(r.imagenameStack));
    results.forEach((result) => generate_1.writeResult(result.imagenameStack, result.parentReadMes, result.parentDockers));
};
main('.templates');
