### git for Ubuntu

RUN sudo add-apt-repository ppa:git-core/ppa && sudo apt-get update && \
    sudo apt-get install --no-install-recommends -y \
    git && \
  sudo apt-get autoremove -y && \
  sudo apt-get clean -y && \
  sudo rm -rf /var/lib/apt/lists/* 
