### upgrade.Dockerfile
USER root

ENV DEV_VERSION={DEV_VERSION}

RUN apt-get update && apt-get dist-upgrade -y && \
	apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

USER ${USERNAME}