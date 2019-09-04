FROM devimage

### zsh.Dockerfile
ARG ENTRY=/opt/devcontainer-entrypoint.sh

RUN apt-get update \ 
    && apt-get install --no-install-recommends -y \ 
        zsh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && curl -Lo /opt/install-oh-my-zsh.sh https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh \
    && chmod 555 /opt/install-oh-my-zsh.sh \
    && echo 'test -f ~/.zshrc || SHELL=/usr/bin/zsh sh /opt/install-oh-my-zsh.sh; \n\
            sysctl fs.inotify.max_user_watches=524288 && sysctl -p \n\
            supervisord; \n\
            test -f ~/.zshrc && sleep 10 && sed -i -e '\''s/robbyrussell/sunaku/g'\'' ~/.zshrc \n\    
            (apt-get update && apt-get install --no-install-recommends locales) || true \n\
            echo "export LC_ALL=en_US.UTF-8" >>  ~/.zshrc \n\
            echo "export LANG=en_US.UTF-8" >>  ~/.zshrc \n\
            trap : TERM INT; \n\
            sleep infinity & wait\n' >> $ENTRY \
    && chmod 555 $ENTRY

ENV SHELL /usr/bin/zsh

CMD bash /opt/devcontainer-entrypoint.sh