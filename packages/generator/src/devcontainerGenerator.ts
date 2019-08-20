import { promises as fs, Dirent } from 'fs';

type Base = "stretch" | "buster" | "disco" | "eoan";

type NodeVesion = "lts" | "current" ; 

const getVersion = (b: Base) => b === "stretch" ? '9' :
    b === "buster" ? '10' :
        b === "disco" ? '19.04' : '19.10';

const getDistro = (b: Base) => (b === "stretch" || b === "buster") ? "Debian" : "Ubuntu"

import * as softwareVersions from "../versions.json";

export class DevcontainerGenerator {
    private _dockerfile: string = "";
    private _templates: { [key: string]: string } = {};
    private _templateInputs = ['base', 'git', 'node', 'dotnet', 'xfce', 'noVNC', 'zsh',];
    private _nodeVesion: NodeVesion | null = null
    private _gitVersion = '';
    private _dotnet = false;
    private _xfce = false;
    private _noVNC = false;
    private _zsh = false;


    constructor(private base: Base) {
    };

    private async init() {

        const buffer = await Promise.all(this._templateInputs.map(async fileName => await this.loadTemplate(fileName)))

        this._templateInputs.forEach((input, index) => this._templates[input] = String(buffer[index]));

        return this._templates;
    }

    public setNodeVersion(nodeVersion: NodeVesion) {
        this._nodeVesion = nodeVersion;
    }

    public updateGit() {
        this._gitVersion = softwareVersions.git;
    }

    public setXfce() {
        this._xfce = true
    }

    public setNoVNC() {
        this._noVNC = true
    }

    public setZsh() {
        this._zsh = true
    }

    public setDotnet() {
        this._dotnet = true
    }

    public async generateDockerfile() {
        const templates = await this.init();

        this._dockerfile += templates['base'].replace('{DISTRO}', this.base);

        if (this._gitVersion) {
            this._dockerfile += templates['git'].replace('{GIT_VERSION}', this._gitVersion)
        }

        if (this._nodeVesion) {
            this._dockerfile += templates['node'].replace('{NODE_VERSION}', softwareVersions.node[this._nodeVesion])
                .replace('{YARN_VERSION}', softwareVersions.yarn);
        }

        if (this._dotnet) {
            this._dockerfile += templates['dotnet'];
        }

        if (this._xfce) {
            this._dockerfile += templates['xfce'];
        }

        if (this._noVNC) {
            this._dockerfile += templates['noVNC'];
        }

        if (this._zsh) {
            this._dockerfile += templates['zsh'];
        }

        return this._dockerfile;
    }

    private loadTemplate = async (filename: string) => await fs.readFile(`${__dirname}/../../templates/${filename}.Dockerfile`)
}