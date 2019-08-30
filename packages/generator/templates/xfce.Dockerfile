### xfce.Dockerfile
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        xfce4 \
        xfce4-goodies \
        google-chrome-stable && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* 
