FROM devimage

### gradle.Dockerfile

# download and install Gradle
# https://services.gradle.org/distributions/
RUN cd /opt && \
    wget -q https://services.gradle.org/distributions/gradle-{GRADLE_VERSION}-bin.zip && \
    unzip gradle*.zip && \
    ls -d */ | sed 's/\/*$//g' | xargs -I{} mv {} gradle && \
    rm gradle*.zip

# ENV variables
ENV GRADLE_HOME /opt/gradle
ENV PATH ${PATH}:${GRADLE_HOME}/bin