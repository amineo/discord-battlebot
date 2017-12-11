#!/bin/bash

# running nodemon is optional but recommended for local dev. It'll make your life easier :)
# to install nodemon: npm install -g nodemon

NODE_ENV=dev STEAM_KEY=your_steam_key DISCORD_TOKEN=your_discord_token nodemon battlebot.js