# docker.Dockerfile
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN sudo apt-get update && sudo apt-get install -y \
        docker.io && \ 
    echo "[program:novnc]"                               >> $SUPERVISORCONF && \
    echo "command=sudo chmod 666 /var/run/docker.sock"   >> $SUPERVISORCONF && \
    echo "autostart=true"                                >> $SUPERVISORCONF && \
    echo ""                                              >> $SUPERVISORCONF && \
    sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0-rc2/docker-compose-Linux-x86_64" -o /usr/local/bin/docker-compose && \
    sudo chmod +x /usr/local/bin/docker-compose && \
    sudo apt-get autoremove -y && \
    sudo apt-get clean -y  && \
    sudo rm -rf /var/lib/apt/lists/*
SHELL ["/bin/sh", "-c"]
