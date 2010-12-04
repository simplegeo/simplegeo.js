#!/bin/bash -ex
# This file is executed inside of pbuilder to build in Hudson

# TODO Workaround to make sure no files are owned by root
# need to figure out how to run pbuilder in a better way
cleanexit() {
    local exit_status=$?
    if [ -n "$SUDO_UID" ]; then
        chown -R $SUDO_UID:$SUDO_GID .
    fi
    exit $exit_status
}
trap cleanexit ERR

env

cd $1
apt-get update
apt-get install rake rubygems sun-java6-jre -y -f --force-yes
apt-get install -y -f --force-yes

gem install sprockets;

rake minify
rake doc

cleanexit
