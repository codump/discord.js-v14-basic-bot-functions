# Discord.js v14 basic bot functions (still in development)

## Features
- The new slash commands.
  - `/serverinfo` Information about the server.
  - `/automsgmention` Automated message with mention.
  - `/code` How to use code on discord.
  - `/jsfiddle` Ask to start a jsfiddle.
- Auto roles.
- Join and leave notification.
- Notification when someone starts streaming on discord.
- GitHub notifications. <sup>(Releases, push, pull and more depending on your gh webhook settings.)</sup>

## What u need
- Installed [node.js](https://nodejs.org/en/download/)
- Installed [git](https://github.com/git-guides/install-git) <sup>(if you choose to use git clone)</sup>



## Installation

| CMD        | <samp>`git clone https://github.com/codump/discord.js-v14-basic-bot-functions && cd discord.js-v14-basic-bot-functions && npm install`</samp>           |
| ------------- |:-------------:|
| **PowerShell**     | **<samp>`git clone https://github.com/codump/discord.js-v14-basic-bot-functions ; cd discord.js-v14-basic-bot-functions ; npm install`</samp>** |
| **OR**     | **<samp>Download the [latest version](https://github.com/codump/discord.js-v14-basic-bot-functions/releases) and unarchive. And then run `npm install`</samp>** |

Fill in the `config.json` with the correct values.


## Run
- `node index.js` start up the bot.
- `node deploy-commands.js` on first time use. And every time you add a command.
- Change `commandId` in the script, then run `node delete-command.js` to delete.
- `node insert-roles.js` on first time use. And when you want to add new roles.



## Intents
- guildMemberAdd.js - Welcome message needs server members intent.
- guildMemberRemove.js - Bye message needs presence intent. 
- messageReactionAdd.js - Pick a role needs server members & message content intent.
- messageCreate.js - Edit webhook needs message content intent.

Live demo of the bot: https://codump.github.io/go/discord/

Looking for free bot hosting? https://codump.github.io/go/bot-hosting/
