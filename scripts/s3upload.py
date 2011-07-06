#!/usr/bin/env python
from optparse import OptionParser
import boto.s3.connection
import sys

def main():
    parser = OptionParser(usage='%prog [options] <input file> <key name>')
    parser.add_option('-b', '--bucket', dest='bucket')
    parser.add_option('-t', '--content-type', dest='content_type',
        default=None, help='Set the Content-type header to this value')
    parser.add_option('-c', '--cache', dest='cache', default=3600, type='int',
        help='Set the Cache-control: max-age header to this value')
    parser.add_option('-p', '--policy', dest='policy',
        help='Use the given canned ACL policy for this key (eg. public-read)')

    options, args = parser.parse_args()

    if len(args) < 2:
        parser.print_help()
        return -1

    inputfile, keyname = args[:2]

    if inputfile == '-':
        inputfile = sys.stdin
    else:
        inputfile = open(inputfile, 'rb')

    headers = {'Cache-Control': 'max-age=%i' % options.cache}
    if options.content_type:
        headers['Content-Type'] = options.content_type

    conn = boto.s3.connection.S3Connection()
    bucket = conn.get_bucket(options.bucket)
    key = bucket.get_key(keyname)
    if not key:
        key = bucket.new_key(keyname)
    key.set_contents_from_file(inputfile, headers=headers,
        policy=options.policy)

if __name__ == '__main__':
    sys.exit(main())
