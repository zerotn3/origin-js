FROM ubuntu:16.04

RUN apt-get update

# utilities
RUN apt-get install -y curl tcl git vim apt-utils build-essential net-tools

# node.js - dependencies of ipfs get a compile error in 8.x and 10.x
WORKDIR /tmp
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs

# local blockchain, ipfs
# note: node-gyp requires python <3.0.0, so the node related programs are being installed before python related ones

# TODO: pull port, mnemonic, etc. from config
WORKDIR /opt/ganache
RUN npm install ganache-core
COPY files/scripts/start-ganache.js .

# TODO: upload test fixtures for origin-js? 
# TODO: config: for switching between localhost and proxy to https://gateway.originprotocol.com:443?
WORKDIR /opt/ipfs
RUN npm install ipfs ipfs-api
COPY files/scripts/start-ipfs.js .


# Postgresql 9.5 
# TODO: install specifying 9.x so commands below don't hardcode the version
# https://docs.docker.com/engine/examples/postgresql_service/#connecting-from-your-host-system
RUN apt-get install -y postgresql
USER postgres
COPY files/config/pg_hba.conf /etc/postgresql/9.5/main/
COPY files/config/postgresql.conf /etc/postgresql/9.5/main/
RUN    /etc/init.d/postgresql start &&\
    psql --command "CREATE USER docker WITH SUPERUSER PASSWORD 'docker';" &&\
    psql --command 'CREATE DATABASE "bridge-server" OWNER docker;'
USER root

# Redis 4.0+
WORKDIR /tmp
RUN curl -O http://download.redis.io/redis-stable.tar.gz && \
	tar xzvf redis-stable.tar.gz && \
	cd redis-stable &&  make install
RUN mkdir /etc/redis
COPY files/config/redis.conf /etc/redis
RUN adduser --system --group --no-create-home redis && \
	mkdir /var/lib/redis && \
	chown redis:redis /var/lib/redis && \
	chmod 770 /var/lib/redis

# python 3.6 is installed after programs that depend on node-gyp, which requires python <3.x.x
RUN apt-get install -y software-properties-common python-software-properties && \
	add-apt-repository ppa:jonathonf/python-3.6 && \
	apt-get update && \
	apt-get install -y python3.6 python3.6-dev python3-pip
RUN ln -nvfs /usr/bin/python3.6 /usr/bin/python && \
	ln -nvfs /usr/bin/python3.6 /usr/bin/python3 && \
	ln -nvfs /usr/bin/pip3 /usr/bin/pip
RUN pip3 install pip --upgrade

# Bridge server
# TODO: integrate envkey
WORKDIR /opt
RUN git clone https://github.com/OriginProtocol/bridge-server.git
WORKDIR /opt/bridge-server/
# for compiling dependencies of bridge server... dependencies (on 16.04)
RUN apt-get install -y pkg-config libffi-dev autoconf libtool libssl-dev
# TODO: remove hacks
RUN sed -i '/pytest-*/d' requirements.txt 
RUN python -m pip install -r requirements.txt
RUN sed -i 's/app.run()/app.run(host= "0.0.0.0")/' main.py
COPY files/config/dev.env .env
# needed by flask 
ENV LC_ALL=C.UTF-8 \
    LANG=C.UTF-8
# make sure postgres is started before running migrations
RUN /etc/init.d/postgresql start && \
	DATABASE_URL=postgresql://docker:docker@localhost:5432/bridge-server FLASK_APP=main.py flask db upgrade

# run everything with pm2 (thanks Gabo!)
WORKDIR /opt
COPY files/process.json .
RUN npm install -g pm2

# upload postgres start script
RUN apt-get install -y sudo
WORKDIR /opt/pg
COPY files/scripts/start-pg.sh .

# cleanup
RUN rm -rf /tmp/*

# Expose ports for pm2 health check endpoint, bridge server, ipfs, postgres, redis, ganache
# TODO: pull these from configs
EXPOSE 4000 5000 5002 8080 5432 6379 8545

CMD pm2-runtime /opt/process.json --web 4000