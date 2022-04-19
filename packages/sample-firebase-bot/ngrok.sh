#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
TOP_DIR="$(dirname $(dirname $SCRIPT_DIR))"

FIREBASE_PROJECT="$(jq -r .projects.default $TOP_DIR/.firebaserc)"
REGION="us-central1"

if [ "$1" == "start" ]; then
  PID="$(pidof ngrok)"
  if [[ -z $PID ]]; then
    echo "Please start ngrok in another window"
    exit 1
  fi
  URL=$(curl -sX GET \
    'http://localhost:4040/api/tunnels' \
    --header 'Accept: */*' \
    --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' | \
    jq -r '.tunnels[0].public_url')
  sed -i "s@WEBHOOK_URL.*@WEBHOOK_URL=\"${URL}/$FIREBASE_PROJECT/$REGION/bot/webhook\"@" $SCRIPT_DIR/.env
elif [ "$1" == "stop" ]; then
  curl -sX DELETE \
    'http://localhost:4040/api/tunnels/grammy' \
    --header 'Accept: */*' \
    --header 'User-Agent: Thunder Client (https://www.thunderclient.com)'
  killall ngrok
  sed -i "s@WEBHOOK_URL.*@WEBHOOK_URL=@" $SCRIPT_DIR/.env
fi
