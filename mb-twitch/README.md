# Server for Twitch Integration MusicBee Plugin

## TODO:
- [ ] Remove database options from this project.
  - [X] Add in user state. This will store a username in a JSON doc which will look something like this `{"kingga": "token_here"}`. This will allow for some sort of persistent authentication (we will need to add a token/user input into the MusicBee plugin configuration UI).
  - [X] Add a wait to refresh the token (add to plugin as well so they can do it from MusicBee).
