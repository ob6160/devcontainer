import { promises as fs, Dirent } from 'fs';

type Base = "stretch" | "buster" | "disco" | "eoan" ;

const getVersion = (b: Base) => b === "stretch"? '9' :
    b=== "buster" ? '10' : 
    b=== "disco" ? '19.04' : '19.10';

const getDistro = (b: Base) => (b === "stretch" || b=== "buster") ? "Debian" : "Ubuntu"
 



export class DevcontainerGenerator {
    private _dockerfile: string = "";
    private _templates: {[key: string]: string} = {};
    private _templateInputs = ['base', 'node'];
    private _nodeVesion = '';
   

    constructor(private base: string) {
    };

    private async init () {

        const buffer = await Promise.all(this._templateInputs.map(async fileName => await this.loadTemplate(fileName)))

        this._templateInputs.forEach((input, index) => this._templates[input]= String(buffer[index]));

        return this._templates;
    }

    public setNodeVersion(nodeVersion: string) {
        this._nodeVesion=nodeVersion;
    }



    public async generate() {
        const templates = await this.init();
        
        this._dockerfile += templates ['base'].replace('{DISTRO}', this.base);
        
        if (this._nodeVesion){
        this._dockerfile += templates ['base'].replace('{NODE_VERSION}', this._nodeVesion);
        }

        return this._dockerfile;
    }

    private loadTemplate = async (filename: string) => await fs.readFile(`${__dirname}/../templates/${filename}.Dockerfile`)
}