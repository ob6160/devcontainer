FROM devimage

### zsh.Dockerfile
ARG ENTRY=/opt/devcontainer-entrypoint.sh

RUN apt-get update \ 
    && apt-get install --no-install-recommends -y \ 
        zsh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 1000 dev \
    && useradd --uid 1000 --gid dev --shell /usr/bin/zsh --create-home developer \
    && curl -Lo /opt/install-oh-my-zsh.sh https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh \
    && chmod 555 /opt/install-oh-my-zsh.sh \
    && echo "test -f ~/.zshrc || SHELL=/usr/bin/zsh sh /opt/install-oh-my-zsh.sh; " >  $ENTRY \
    && echo "supervisord; "                                      >> $ENTRY \
    && echo "trap : TERM INT;"                                   >> $ENTRY \
    && echo "sleep infinity & wait "                             >> $ENTRY \
    && chmod 555 $ENTRY

USER developer
WORKDIR /home/developer
ENV SHELL /usr/bin/zsh

CMD bash /opt/devcontainer-entrypoint.sh