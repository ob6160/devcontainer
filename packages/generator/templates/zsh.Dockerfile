FROM devimage

### zsh.Dockerfile
ARG ENTRY=/opt/devcontainer-entrypoint.sh

RUN apt-get update \ 
    && apt-get install --no-install-recommends -y \ 
        zsh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" \
    && sed -i -e 's/robbyrussell/sunaku/g' ~/.zshrc \
    && echo "sleep infinity" >> /usr/bin/startx 


ENV SHELL /usr/bin/zsh


CMD startx