### zsh.Dockerfile

RUN apt-get update && apt-get install --no-install-recommends -y zsh && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

RUN ls -la /root
USER developer

RUN curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh

ENTRYPOINT [ "supervisord" ]