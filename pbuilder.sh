#!/bin/sh -x
# This file is executed inside of pbuilder to build in Hudson

env

cd $1
apt-get update
apt-get install rake rubygems yui-compressor -y -f --force-yes
apt-get install -y -f --force-yes

gem install sprockets;

rake minify
