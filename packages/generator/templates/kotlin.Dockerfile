FROM devimage

ENV KOTLIN_VERSION {KOTLIN_VERSION}

# download and install Kotlin compiler
# https://github.com/JetBrains/kotlin/releases/latest
RUN cd /opt && \
    wget -q https://github.com/JetBrains/kotlin/releases/download/v${KOTLIN_VERSION}/kotlin-compiler-${KOTLIN_VERSION}.zip && \
    unzip *kotlin*.zip && \
    rm *kotlin*.zip

ENV KOTLIN_HOME /opt/kotlinc

ENV PATH ${PATH}:${KOTLIN_HOME}/bin