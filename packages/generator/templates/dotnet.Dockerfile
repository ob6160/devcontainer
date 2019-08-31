### dotnet.Dockerfile
ARG OCTO_TOOLS_VERSION=6.12.0

ENV DOTNET_SDK_VERSION {DOTNET_SDK_VERSION} \


RUN apt-get update \
    && (apt-get install -y --no-install-recommends libicu57 libssl1.0.2 \
    || apt-get install -y --no-install-recommends libicu63 libssl1.1 )\
    && apt-get install -y --no-install-recommends \
        libc6 \
        libgcc1 \
        libgssapi-krb5-2 \
        liblttng-ust0 \
        libstdc++6 \
        zlib1g \
        libunwind-dev \
    && rm -rf /var/lib/apt/lists/* && \ 
curl -SL --output dotnet.tar.gz  https://dotnetcli.blob.core.windows.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-x64.tar.gz \
    && dotnet_sha512='{dotnet_sha512}' \
    && echo "$dotnet_sha512 dotnet.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -zxf dotnet.tar.gz -C /usr/share/dotnet \
    && rm dotnet.tar.gz \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet && \
   dotnet help && \ 
mkdir -p /tmp/octo && \
    curl -Lo /tmp/octo.tar.gz https://download.octopusdeploy.com/octopus-tools/${OCTO_TOOLS_VERSION}/OctopusTools.${OCTO_TOOLS_VERSION}.debian.8-x64.tar.gz && \
    tar -xf /tmp/octo.tar.gz -C /tmp/octo/ && \
    mv /tmp/octo /opt/ && \
    ln /opt/octo/Octo /usr/local/bin/octo && \
    rm -rf /tmp/* && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

    # Configure web servers to bind to port 80 when present
ENV ASPNETCORE_URLS=http://+:80 \
    # Enable detection of running in a container
    DOTNET_RUNNING_IN_CONTAINER=true \
    # Enable correct mode for dotnet watch (only mode supported in a container)
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    # Skip extraction of XML docs - generally not useful within an image/container - helps performance
    NUGET_XMLDOC_MODE=skip \
    # Opting out from telemetry
    DOTNET_CLI_TELEMETRY_OPTOUT=true

