# docker.Dockerfile
RUN apt-get update && apt-get install -y \
        docker-compose \
        docker.io && \ 
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*
