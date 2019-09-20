import { promises as fs, Dirent } from 'fs';

type Base = "stretch" | "buster" | "disco" | "eoan";

type NodeVesion = "lts" | "current";

const getVersion = (b: Base) => b === "stretch" ? '9' :
    b === "buster" ? '10' :
        b === "disco" ? '19.04' : '19.10';

const getDistro = (b: Base) => (b === "stretch" || b === "buster") ? "Debian" : "Ubuntu"

import * as softwareVersions from "../versions.json";
import { ENGINE_METHOD_DIGESTS } from 'constants';

export class DevcontainerGenerator {
    private _dockerfile: string = "";
    private _readme: string = "";

    private _dockerTemplates: { [key: string]: string } = {};
    private _readmeTemplates: { [key: string]: string } = {};

    private _templateInputs = ['base', 'upgrade', 'git', 'amplify', 'chromium', 'gitUbuntu', 'node', 'cypress', 'dotnet', 'docker', 'dotnet3', 'xfce', 'noVNC', 'xpra', 'zsh', 'suffix'];
    private _nodeVesion: NodeVesion | null = null;
    private _gitVersion = '';
    private _amplify = false;
    private _cypressVersion = '';
    private _dotnet: null | "2" | "3" = null;
    private _upgrade = false;
    private _xfce = false;
    private _docker = false;
    private _xpra = false;
    private _noVNC = false;
    private _zsh = false;
    private _chrome = false;
    private _androidsdk = false;
    private _gradle = false;
    private _kotlin = false;
    

    constructor(private base: Base) {
    };

    private async init() {

        const bufferDockerfiles = await Promise.all(this._templateInputs.map(async fileName => await this.loadTemplate(fileName, 'Dockerfile')))
        const bufferReadmefiles = await Promise.all(this._templateInputs.map(async fileName => await this.loadTemplate(fileName, 'README')))


        this._templateInputs.forEach((input, index) => this._dockerTemplates[input] = String(bufferDockerfiles[index]));
        this._templateInputs.forEach((input, index) => this._readmeTemplates[input] = String(bufferReadmefiles[index]));


        return {
            dockerTemplates: this._dockerTemplates,
            readmeTemplates: this._readmeTemplates
        };
    }

    public setNodeVersion(nodeVersion: NodeVesion) {
        this._nodeVesion = nodeVersion;
    }

    public updateGit() {
        this._gitVersion = softwareVersions.git;
    }

    public setXfce() {
        this._xfce = true;
    }

    public setChrome() {
        this._chrome = true;
    }


    public setAmplify() {
        this._amplify = true;
    }

    public setRemoteDesktop( type: 'xpra' | 'noVNC' = 'xpra') {
        if (type === 'xpra') {
            this._xpra = true;
        }
        else {
            this._noVNC = true
        }

        if (this._noVNC===true && this._xpra===true) throw new Error("You can't have VNC and Xpra on the same image");
        
    }

    public setUpgraded() {
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

    public async generate() {
        const { dockerTemplates,
            readmeTemplates } = await this.init();


        this._dockerfile += dockerTemplates['base'].replace('{DISTRO}', this.base);
        this._readme += readmeTemplates['base'].replace('{DISTRO}', this.base);

        if (this._upgrade) {
            const now = new Date();
            this._dockerfile += dockerTemplates['upgrade'].replace('{DEV_VERSION}', `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
            this._readme += readmeTemplates['upgrade'].replace('{DEV_VERSION}', `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);

        }

        if (this._gitVersion) {
            if (getDistro(this.base) === "Ubuntu") { this._dockerfile += dockerTemplates['gitUbuntu'] }
            else {
                this._dockerfile += dockerTemplates['git'].replace('{GIT_VERSION}', this._gitVersion)
            }

            if (getDistro(this.base) === "Ubuntu") { this._readme += readmeTemplates['gitUbuntu'] }
            else {
                this._readme += readmeTemplates['git'].replace('{GIT_VERSION}', this._gitVersion)
            }
        }

        if (this._nodeVesion) {
            this._dockerfile += dockerTemplates['node'].replace('{NODE_VERSION}', softwareVersions.node[this._nodeVesion])
                .replace('{YARN_VERSION}', softwareVersions.yarn);

            this._readme += readmeTemplates['node'].replace('{NODE_VERSION}', softwareVersions.node[this._nodeVesion])
                .replace('{YARN_VERSION}', softwareVersions.yarn);


        }

        if (this._docker) {
            this._dockerfile += dockerTemplates['docker'];
            this._readme += readmeTemplates['docker'];
        }


        if (this._dotnet) {
            if (this._dotnet === "2")
                this._dockerfile += dockerTemplates['dotnet'].replace('{DOTNET_SDK_VERSION}', softwareVersions.dotnet)
                    .replace('{dotnet_sha512}', softwareVersions.sha.dotnet_sha512["2.2.402"]);
            else {
                this._dockerfile += dockerTemplates['dotnet'].replace('{DOTNET_SDK_VERSION}', softwareVersions.dotnet3)
                    .replace('{dotnet_sha512}', softwareVersions.sha.dotnet_sha512["3.0.100-rc1-014190"]);
            }

            if (this._dotnet === "2")
                this._readme += readmeTemplates['dotnet'].replace('{DOTNET_SDK_VERSION}', softwareVersions.dotnet)
                    .replace('{dotnet_sha512}', softwareVersions.sha.dotnet_sha512["2.2.402"]);
            else {
                this._readme += readmeTemplates['dotnet'].replace('{DOTNET_SDK_VERSION}', softwareVersions.dotnet3)
                    .replace('{dotnet_sha512}', softwareVersions.sha.dotnet_sha512["3.0.100-rc1-014190"]);
            }
        }

        if (this._xpra) {
            this._dockerfile += dockerTemplates['xpra'].replace(/{XPRADISTRO}/g, this.base === "eoan" ? "disco" : this.base);
            this._readme += readmeTemplates['xpra'];
        }

        if (this._xfce) {
            this._dockerfile += dockerTemplates['xfce'];
            this._readme += readmeTemplates['xfce'];

            if (this._xpra) {
                
                this._dockerfile += `
                ENV STARTCMD="xpra start-desktop --start=xfce4-session --html=on --bind-tcp=0.0.0.0:6080 --daemon=no"
                `;
            }
        }

        if (this._amplify) {
            this._dockerfile += dockerTemplates['amplify'].replace('{AMPLIFY}', softwareVersions.amplify)
            this._readme += readmeTemplates['amplify'].replace('{AMPLIFY}', softwareVersions.amplify)
        }

        if (this._cypressVersion) {
            this._dockerfile += dockerTemplates['cypress'].replace('{CYPRESS_VERION}', this._cypressVersion)
            this._readme += readmeTemplates['cypress'].replace('{CYPRESS_VERION}', this._cypressVersion)
        }


        if (this._chrome) {
            this._dockerfile += dockerTemplates['chromium'];
            this._readme += readmeTemplates['chromium'];
        }

        if (this._noVNC) {
            this._dockerfile += dockerTemplates['noVNC'];
            this._readme += readmeTemplates['noVNC'];
        }

        if (this._zsh) {
            this._dockerfile += dockerTemplates['zsh'];
            this._readme += readmeTemplates['zsh'];
        }

        this._dockerfile += dockerTemplates['suffix'];
        this._readme += readmeTemplates['suffix'];

        this._dockerfile = this._dockerfile.replace(/FROM devimage\n/g, "");

        return {
            Dockerfile: this._dockerfile,
            README: this._readme
        }
    }

    private loadTemplate = async (filename: string, extension: 'Dockerfile' | 'README') => await fs.readFile(`${__dirname}/../../templates/${filename}.${extension}`).catch(e => { console.error({ e }); return "" })
}
