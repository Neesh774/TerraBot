# TerraBot
TerraBot is a general purpose discord bot I made for the [Project Solaris Server](https://discord.gg/ss9Wtzb). It will log most important events, has moderation features, fun commands, and a starboard. It is fully compatible with Discord slash commands and buttons.
## Commands
### Birthdays
- ``birthday`` tells you what your birthday is. It's ok, we all forget sometimes.
- ``birthdays`` gives you a nice list of everyone's birthdays
- ``nextbirthday`` tells you who the next person to have their birthday is.
- ``setbday <mm> <dd>`` lets you set your birthday(make sure it's an actual birthday).
### Custom Commands & Auto Responders
- ``aradd <trigger> <response> [another response] [another response]...`` will let you create an auto responder, which will respond immediately with a random response out of your list when somebody sends that trigger.
- ``arclearall`` will clear the list of auto responses in the guild.
- ``ardel <responder id>`` will delete a certain auto responder.
- ``arget [command ID]`` will give you information about a certain auto responder, or give you a list of all of them with ids.
- ``ccadd <trigger> <response> [another response] [another response]...`` will let you create a custom command, which will allow the users to use the trigger as if it's a command, and respond with a random response out of your list
- ``ccclearall`` will clear the list of custom commands in the guild.
- ``ccdel <responder id>`` will delete a certain custom command.
- ``ccget [command ID]`` will give you information about a certain custom command, or give you a list of all of them with ids.
### Fun
- ``8ball <question>`` will roll the ol' 8 ball with your question.
- ``ascii <text>`` will convert your text into ascii format.
- ``fact`` will give you a random fact.
- ``flip`` will flip a coin.
- ``meme`` will give you a random meme from the r/dankmemes subreddit.
- ``mock <text>`` wiLl mOck tHe TeXt lIkE thIs.
### Info
- ``help [command]`` will DM you with a list of all TerraBot's commands, or give you information about any one command.
- ``ping``will give you information about TerraBot's latency.
### Moderation
- ``ban <user> [reason]`` bans a user with an optional reason
- ``kick <user> [reason]`` kicks a user with an optional reason.
- ``mute <user> [time]`` will mute a user, optionally unmuting them after a certain amount of time.
- ``prefix <prefix>`` will change TerraBot's prefix.
- ``purge <number>`` will purge a certain amount of a channel's messages.
- ``role <user> <role name>`` will give or remove a role from a user
- ``unmute <user>`` will unmute a user.
- ``warn <user> [reason]`` will warn a user. 2 warns will mute them for 2 hours, and 4 warns will kick them.
### Starboards
- ``clearsb [original message id] [original message channel id]`` will clear the starboards, or remove a certain starboard using it's message and channel ID.
- ``sblb [page]`` will tell you who has the most starboards.
- ``sbs [user]`` will tell you how many starboards you have, or someone else has.
- ``starboards [page]`` will give you a list of the guilds' starboards.
### Reaction Roles
- ``rr <Channel ID> <Message ID> <Role ID> <Reaction Emote>`` will create a reaction role on the given message with the given role and emote.
- ``rrall`` will display all active reaction roles.
- ``rrdel [id]`` will delete the reaction roles, or a certain one.
### Suggestions
- ``suggest <suggestion>`` will send a suggestion in the guild's suggestion channel.
- ``suggestdel <suggestion ID>`` will delete a certain suggestion.
- ``suggestget <id>`` will give you information about a certain suggestion.
- ``suggestions`` will give you a list of active suggestions.
- ``suggestionsclear`` will clear all active suggestions.
- ``suggestmark <id> <Dead|In_Progress|Done> [reason]`` will mark a given suggestion as either dead, being worked on, or implemented with an optional reason.
### Utility
- ``avatar [user]`` will give you your avatar, or someone else's.
- ``botinfo`` will give you information about the client.
- ``calc <equation>`` will calculate an equation.
- ``embed <title> ++ <description>`` will create an embed.
- ``setreminder <time> <reminder>`` will create a reminder.
- ``say <text>`` will make TerraBot repeat you.
- ``serverinfo`` will give you information about a server.
- ``study <time>`` will isolate you so you can study in peace.
- ``timezones`` will give you information about the most popular timezones.
- ``whois <user>`` will give you information about a certain user.
### Music
- ``back`` will go to the previous song.
- ``disconnect`` will disconnect Terra from the VC.
- ``filter`` will give you a list of filter options.
- ``loop <option>`` will give you a list of loop options.
- ``lyrics <song name>`` will give you the lyrics to a song.
- ``next`` will go to the next song.
- ``play <song name | spotify URL | playlist URL>`` will play a song.
- ``playnext <song name | spotify URL | playlist URL>`` will play this song next.
- ``queue`` will give you a list of the current queue.
- ``skip`` will skip the current song.
- ``skipto <index>`` will skip to a certain song in the queue.
- ``volume <1-100>`` will change the volume of the music player.
- ``np`` will tell you what song is playing.
- ``pause`` will pause/resume the music player.

## Ideas
- ``pin`` will pin a message by it's channel and message ID.
- ``recipe`` will give you a random recipe.

## Hosting
If you want to host a copy of TerraBot yourself, you can do so by following these steps:
- Create a bot account on Discord, and get the token.
- Create a Discord server, and invite TerraBot to it.
- Create a MongoDB collection, and get the URI.
- Find the `sample_token.json` file in your TerraBot folder, and fill in your information.
- Replace the values in the `config.json` file with your information. Feel free to DM me on Discord at ツCheesyNeeshツ#8152 if you need any help.