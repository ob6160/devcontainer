# docker.Dockerfile
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN sudo apt-get update && sudo apt-get install -y \
        docker.io && \ 
    sudo usermod -aG docker $USERNAME && \
    sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0-rc2/docker-compose-Linux-x86_64" -o /usr/local/bin/docker-compose && \
    sudo chmod +x /usr/local/bin/docker-compose && \
    sudo apt-get autoremove -y && \
    sudo apt-get clean -y  && \
    sudo rm -rf /var/lib/apt/lists/*
SHELL ["/bin/sh", "-c"]
