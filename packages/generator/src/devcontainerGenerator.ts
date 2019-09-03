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
    private _templateInputs = ['base', 'upgrade', 'git', 'gitUbuntu', 'node', 'cypress', 'dotnet', 'docker', 'dotnet3', 'xfce', 'noVNC', 'zsh'];
    private _nodeVesion: NodeVesion | null = null;
    private _gitVersion = '';
    private _cypressVersion = '';
    private _dotnet: null | "2" | "3" = null;
    private _upgrade = false;
    private _xfce = false;
    private _docker = false;
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

    public setUpgraded(){
        this._upgrade = true;
    }

    public setZsh() {
        this._zsh = true
    }

    public setDocker() {
        this._docker = true
    }

    public setDotnet(version: "2" | "3" = "2") {
        this._dotnet = version;
    }

    public setCypress() {
        this._cypressVersion = softwareVersions.cypress;
    }

    public async generateDockerfile() {
        const templates = await this.init();

        this._dockerfile += templates['base'].replace('{DISTRO}', this.base);

        if(this._upgrade) {
            const now = new Date();
            this._dockerfile += templates['upgrade'].replace('{DEV_VERSION}', `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`);
        }

        if (this._gitVersion) {
            if (getDistro(this.base)==="Ubuntu") {this._dockerfile += templates['gitUbuntu']}
            else {
                this._dockerfile += templates['git'].replace('{GIT_VERSION}', this._gitVersion)
            }
        }

        if (this._nodeVesion) {
            this._dockerfile += templates['node'].replace('{NODE_VERSION}', softwareVersions.node[this._nodeVesion])
                .replace('{YARN_VERSION}', softwareVersions.yarn);
        }

        if (this._cypressVersion) {
            this._dockerfile += templates['cypress'].replace('{CYPRESS_VERION}', this._cypressVersion)
        }

        if (this._docker) {
            this._dockerfile += templates['docker'];
        }

        if (this._dotnet) {
            if (this._dotnet === "2") 
                this._dockerfile += templates['dotnet'].replace('{DOTNET_SDK_VERSION}', softwareVersions.dotnet)
                    .replace('{dotnet_sha512}', softwareVersions.sha.dotnet_sha512["2.2.401"]);
            else {
                this._dockerfile += templates['dotnet'].replace('{DOTNET_SDK_VERSION}', softwareVersions.dotnet3)
                .replace('{dotnet_sha512}', softwareVersions.sha.dotnet_sha512["3.0.100-preview8-013656"]);
            }
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

        return this._dockerfile.replace(/FROM devimage\n/g, "");
    }

    private loadTemplate = async (filename: string) => await fs.readFile(`${__dirname}/../../templates/${filename}.Dockerfile`)
}
