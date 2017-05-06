#!/bin/sh

cd /app
node ./db-sync.js

exec "$@"
