RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends zsh
RUN sh -c "$(wget -O- https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" && \
    echo "export LC_ALL=en_US.UTF-8" >>  ~/.zshrc && \
    echo "export LANG=en_US.UTF-8" >>  ~/.zshrc  && \
    sudo chsh -s /usr/bin/zsh $USERNAME
RUN sudo apt-get install -y --no-install-recommends \
      locales && \
    sudo apt-get clean -y && \
    sudo rm -rf /var/lib/apt/lists/*
ENV SHELL=/usr/bin/zsh