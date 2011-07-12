#!/bin/sh -ex

VERSION=`cat VERSION`
VERSIONED_CACHE=60
LATEST_CACHE=0

cd build

for file in *.js; do
    python ../scripts/s3upload.py -b $S3_BUCKET -t text/javascript -p public-read $file -c $VERSIONED_CACHE js/$VERSION/$file
done

for file in *.js; do
    python ../scripts/s3upload.py -b $S3_BUCKET -t text/javascript -p public-read $file -c $LATEST_CACHE js/latest/$file
done
