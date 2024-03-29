# Discord.js v14 basic bot functions

## Features
- The new slash commands.
  - `/serverinfo` Information about the server.
  - `/automsgmention` Automated message with mention.
  - `/code` How to use code on discord.
  - `/jsfiddle` Ask to start a jsfiddle.
  - `/kick` Kick a member.
  - `/ban` Ban a member.
  - `/warning` Warn a member and store it in DB.
- Auto roles.
- Join and leave notification.
- Notification when someone starts streaming on discord.
- GitHub notifications. <sup>(Releases, push, pull and more depending on your gh webhook settings.)</sup>
- Ticket channel system.

## What u need
- Installed [node.js](https://nodejs.org/en/download/)
- Installed [git](https://github.com/git-guides/install-git) <sup>(if you choose to use git clone)</sup>
- MongoDB [Atlas](https://www.mongodb.com/cloud/atlas/register) <sup>(if you want to store warnings)</sup>



## Installation

| CMD        | <samp>`git clone https://github.com/codump/discord.js-v14-basic-bot-functions && cd discord.js-v14-basic-bot-functions && npm install`</samp>           |
| ------------- |:-------------:|
| **PowerShell**     | **<samp>`git clone https://github.com/codump/discord.js-v14-basic-bot-functions ; cd discord.js-v14-basic-bot-functions ; npm install`</samp>** |
| **OR**     | **<samp>Download the [latest version](https://github.com/codump/discord.js-v14-basic-bot-functions/releases) and unarchive. And then run `npm install`</samp>** |

Fill in the `config.json` with the correct values.


## Update
If you already used this repo and want to update to the warning command you need to install mongoose:
`npm install mongoose@latest`

## Run
First time use:
- `node deploy-commands.js` on first time use. And every time you add a command.
- `node insert-roles.js` on first time use. And when you want to add new roles.
- `node insert-ticket.js` on first time use. Or when you accidentally deleted the ticket post.

Scripts:
- `node index.js` start up the bot.
- Change `commandId` in the script, then run `node delete-command.js` to delete.



## Intents
- guildMemberAdd.js - Welcome message needs server members intent.
- guildMemberRemove.js - Bye message needs presence intent. 
- messageReactionAdd.js - Pick a role needs server members & message content intent.
- messageCreate.js - Edit webhook needs message content intent.

Live demo of the bot: https://codump.github.io/go/discord/

Looking for free bot hosting? https://codump.github.io/go/bot-hosting/
