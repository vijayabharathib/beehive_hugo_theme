FROM starefossen/ruby-node:2-8-slim
# Forked from https://github.com/publysher/docker-hugo
# Download and install hugo
RUN apt-get -qq update \
    && apt-get -qq install wget libstdc++6
ENV HUGO_VERSION 0.47
ENV HUGO_BINARY hugo_extended_${HUGO_VERSION}_Linux-64bit.deb
RUN wget -P /tmp/ https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY} 
RUN dpkg -i /tmp/${HUGO_BINARY} \
    && rm /tmp/${HUGO_BINARY}

# Create working directory
RUN mkdir /usr/share/blog
WORKDIR /usr/share/blog
COPY package.json yarn.lock /usr/share/blog/
RUN yarn install 
COPY . /usr/share/blog
# Expose default hugo port
EXPOSE 1313

# By default, serve site
ENV HUGO_BASE_URL http://localhost:1313
#CMD hugo server -b ${HUGO_BASE_URL} --bind=0.0.0.0
#CMD hugo server --bind=0.0.0.0