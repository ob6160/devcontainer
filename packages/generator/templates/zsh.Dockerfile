FROM devimage

### zsh.Dockerfie
ARG ENTRY=/opt/devcontainer-entrypoint.sh

RUN apt-get update \ 
    && apt-get install --no-install-recommends -y \ 
        terminator \
        zsh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && git clone --depth 1 https://github.com/robbyrussell/oh-my-zsh.git /etc/skel/.oh-my-zsh \
    && git clone --depth 1 https://github.com/zsh-users/zsh-autosuggestions.git /etc/skel/.oh-my-zsh/plugins/zsh-autosuggestions \
    && git clone --depth 1 https://github.com/zsh-users/zsh-syntax-highlighting.git /etc/skel/.oh-my-zsh/plugins/zsh-syntax-highlighting \
    && cp /etc/skel/.oh-my-zsh/templates/zshrc.zsh-template  /etc/skel/.zshrc \
    && sed -i -e 's/robbyrussell/sunaku/g' /etc/skel/.zshrc \
    && sed -i -e 's/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/g' /etc/skel/.zshrc \
    && echo "sleep infinity" >> /usr/bin/startx 

CMD startx