### zsh.Dockerfile

RUN apt-get update && apt-get install -y --no-install-recommends zsh
RUN sh -c "$(wget -O- https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" && \
    echo "export LC_ALL=en_US.UTF-8" >>  ~/.zshrc && \
    echo "export LANG=en_US.UTF-8" >>  ~/.zshrc  
RUN apt-get install -y --no-install-recommends \
      locales && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*
ENV SHELL=/usr/bin/zsh
