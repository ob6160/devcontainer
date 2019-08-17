SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN sudo apt-get update && sudo apt-get install --no-install-recommends  -y \
    apt-transport-https \
    ca-certificates \
    software-properties-common 
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add - && \
    sudo add-apt-repository \
        "deb [arch=amd64] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" && \
    sudo apt-get update && sudo apt-get install -y \
        docker-ce \
        docker-ce-cli && \ 
    sudo usermod -aG docker $USERNAME && \
    sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0-rc2/docker-compose-Linux-x86_64" -o /usr/local/bin/docker-compose && \
    sudo chmod +x /usr/local/bin/docker-compose && \
    sudo apt-get autoremove -y && \
    sudo apt-get clean -y  && \
    sudo rm -rf /var/lib/apt/lists/*
SHELL ["/bin/sh", "-c"]