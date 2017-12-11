![BattleBot](https://i.imgur.com/V7lg8M8.jpg)  

# BattleBot 
## A Discord bot that queries and monitors Tribes 2 and Midair game servers.

---


You can see BattleBot in action on the [Tribes 2 Discord](https://discord.gg/Y4muNvF).


### BattleBot Commands
`!battlebot help`

| Command  | Description                                                                                    |
|----------|------------------------------------------------------------------------------------------------|
| `help`   | A list of supported commands. All BattleBot query commands self-delete after a 5 minute timout |
| `t2`     | Display the server populations for LAK, SCP & Taco                                             |
| `taco`   | Shows detailed server stats for TacoStand                                                      |
| `lak`    | Shows detailed server stats for Snap LAK Pub                                                   |
| `scp`    | Shows detailed server stats for Snap Crackle Pub                                               |
| `midair` | Display a summary of only populated Midair servers                                             |
| `stats`  | How is BattleBot's toaster doing?                                                              |





### Additional Features
 - Server and population monitors for Tribes 2 and Midair that automatically report stats into its designated channel topics.
 - Ability to post a BattleBot query for a specified amount of time to override the default 5 minute timeout with `!battlebot taco 15` or indefinitly with `!battlebot taco post` 
 - Aliased root prefix and commands. BattleBot can be called from `!battlebot, !bb, !b` or any other custom prefix we want to define.
 - Aliased commands. `!battlebot midair` can also be called with `!battlebot ma`.
 - Ability to set a default command to be executed when you call BattleBot. When you `!battlebot` with no command, `t2` will be used.
 - Ability to activate and deactivate commands.
 - `!battlebot help` is dynamically generated.



---


## Installation


### Prerequisites (API Keys)
 - A Discord Bot token
 - A Steam Web API Key


### Dev Setup
 - Clone or Fork this repo
 - Pull in the submodules (_qstat_) with git submodule init/update
    ```
        git submodule init
        git submodule update
    ```
 - `npm install`
 - Rename `dev.example.sh` to `dev.sh` so that your API keys wont be tracked in your repo.
 - Modify `dev.sh` with your Discord/Steam API keys respectively.
 - _Optional_: Install **nodemon**. `npm install -g nodemon` Nodemon will monitor any changes you make to BattleBot and auto-reload the application.
 - Fire-up your dev environment by running `dev.sh`



----

### Credits & Thanks
 - [qstat](https://github.com/multiplay/qstat) - A well known server query library. *I'm now an official a contributor! :)*
 - The folks over at [AnIdiotsGuide](https://github.com/An-Idiots-Guide/guidebot) for putting together an awesome example bot framework
 - ChocoTaco - BattleBot's logo
