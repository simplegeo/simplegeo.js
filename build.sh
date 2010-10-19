#!/bin/sh
# This file is executed inside of pbuilder to build in Hudson

apt-get install rake rubygems yui-compressor

ruby -rrubygems -e 'Gem.available?("sprockets") or exit(1)' || gem install sprockets;

rake minify
