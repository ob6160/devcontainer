import { run, writeResult } from './generate';

const main = async (inputFolder: string) => {
    let results = await run(inputFolder);

    results = results.filter((x: any) => x.imagenameStack.includes('zsh'));
    // results = results.filter((x: any) => x.imagenameStack.includes('deb-buster'));
    // results = results.filter((x: any)=> x.imagenameStack.includes('node-12.8.1'));
    // results = results.filter((x: any) => !x.imagenameStack.includes('bash'));

    //Working from just this folders
    results.map((r: any) => console.log(r.imagenameStack));
   
    results.forEach((result: any) => writeResult(result.imagenameStack, result.parentReadMes, result.parentDockers));
}

main('.templates');