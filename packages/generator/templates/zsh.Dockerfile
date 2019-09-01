FROM devimage

### zsh.Dockerfile
ARG ENTRY=/opt/devcontainer-entrypoint.sh

RUN apt-get update \ 
    && apt-get install --no-install-recommends -y \ 
        gosu \
        zsh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 1000 dev \
    && useradd --uid 1000 --gid dev --shell /bin/bash --create-home developer \
    && curl -Lo /opt/install-oh-my-zsh.sh https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh \
    && chmod 555 /opt/install-oh-my-zsh.sh \
    && echo 'test -f ~/.zshrc || SHELL=/usr/bin/zsh sh /opt/install-oh-my-zsh.sh  \n\
            supervisord; \n\
            test -f ~/.zshrc && sleep 10 && sed -i -e '\''s/robbyrussell/sunaku/g'\'' ~/.zshrc \n\    
            trap : TERM INT; \n\
            sleep infinity & wait\n' >> $ENTRY \
    && chmod 555 $ENTRY

USER developer
WORKDIR /home/developer
ENV SHELL /usr/bin/zsh

CMD bash /opt/devcontainer-entrypoint.sh