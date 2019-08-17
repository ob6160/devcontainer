USER root
RUN apt-get update -qq -y && apt-get -y install --no-install-recommends \
    wget \
    libicu63 \
    libssl1.1 \
    libc6 \
    libgcc1 \
    libgssapi-krb5-2 \
    libicu63 \
    libssl1.1 \
    libstdc++6 \
    zlib1g 
RUN wget -O /tmp/dotnet.tar.gz https://download.visualstudio.microsoft.com/download/pr/228832ea-805f-45ab-8c88-fa36165701b9/16ce29a06031eeb09058dee94d6f5330/dotnet-sdk-2.2.401-linux-x64.tar.gz
RUN mkdir -p /usr/share/dotnet/

RUN tar zxf /tmp/dotnet.tar.gz -C /usr/share/dotnet/ && rm /tmp/dotnet.tar.gz

RUN ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet

# Configure web servers to bind to port 80 when present
ENV ASPNETCORE_URLS=http://+:80 \
    # Enable detection of running in a container
    DOTNET_RUNNING_IN_CONTAINER=true \
    # Enable correct mode for dotnet watch (only mode supported in a container)
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    # Skip extraction of XML docs - generally not useful within an image/container - helps performance
    NUGET_XMLDOC_MODE=skip

RUN dotnet help

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libunwind-dev \
    && rm -rf /var/lib/apt/lists/*

USER ${USERNAME}

ARG OCTO_TOOLS_VERSION=6.12.0

RUN mkdir -p ${HOME}/tmp/octo && \
    wget -O ${HOME}/tmp/octo.tar.gz https://download.octopusdeploy.com/octopus-tools/${OCTO_TOOLS_VERSION}/OctopusTools.${OCTO_TOOLS_VERSION}.debian.8-x64.tar.gz && \
    tar -xf ${HOME}/tmp/octo.tar.gz -C ${HOME}/tmp/octo/ && \
    sudo mv ${HOME}/tmp/octo /opt/ && \
    sudo ln -s /opt/octo/Octo /usr/local/bin/octo && \
    rm -rf ${HOME}/tmp
