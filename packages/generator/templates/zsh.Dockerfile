FROM devimage

### zsh.Dockerfile

RUN apt-get update \ 
    && apt-get install --no-install-recommends -y \ 
        zsh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 1000 dev \
    && useradd --uid 1000 --gid dev --shell /bin/zsh --create-home developer \

USER developer
RUN curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh


CMD exec /bin/bash -c "supervisord && trap : TERM INT; sleep infinity & wait"