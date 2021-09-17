# BattleBot Release Notes

---

## -> 0.14.2
*09/17/2021*

- !bb pretty for a better query display experience

---

## 0.12.7
*08/25/2020*

- Remove Boot's server and minor cleanup

---

## 0.12.7
*08/25/2020*

- Update Boots's IP

---


## 0.12.6
*07/17/2020*

- Update Discord PUB's IP

---

## 0.12.5
*07/04/2020*

- Update Boots server IP and minor cleanup

---

## 0.12.3
*06/01/2020*

- Remove topic monitor sleep delay since schedule is longer

---

## 0.12.2
*05/30/2020*

- Update topic monitor frequence to discords rate limiting for topic changes. Currently only allows for 2 updates within a 10 minute window

---


## 0.12.0
*04/26/2020*

- Add ability to include a server in the main query list but not topic monitor

---

## 0.10.0
*01/08/2020*

- New `ip` command. Allow query of any tribes 2 server by passing in an ip
    - usage `!battlebot ip 144.202.60.138`

---

## 0.9.7
*11/30/2019*

- Add monitoring for new Discord Proving Grounds server

---
## 0.9.6
*10/07/2019*

- [CHORE] Remove old notification code
- Update help text on the t2 commands
- Cleaning for Hacktober Fest! :D

---
## 0.9.5
*07/24/2019*

- T2 topic monitor only shows detail if player count is >= 2

---

## 0.9.4
*07/24/2019*

- Remove SCP, long live SCP. Add 10 Man Arena Pub

---
## 0.9.3
*07/09/2019*

- Better topic formatting

---

## 0.9.2
*07/09/2019*

- Update topic monitor to include some basic server stats

---

## 0.9.1
*07/09/2019*

- Update PU monitor and query commands to include the new T2 Discord PUB info

---
## 0.8.0
*10/09/2018*

- Merge various tweaks from @ChocoTaco1

---

## 0.7.17
*08/23/2018*

- Remove MidAir topic monitor from the Tribes 2 Discord. Channel was archived.

---

## 0.7.16
*07/18/2018*

- Update Taco's server IP

---

## 0.7.14
*05/16/2018*

- Update Taco's server IP

---

## 0.7.13
*04/15/2018*

- Remove REN from topic monitor. `!b ren` server query still exists.

---

## 0.7.12
*03/30/2018*

- Remove #Match_Reporter topics monitor

---

## 0.7.11
*01/29/2018*

- Update Moment.js to `^2.21.0`
- Update Taco's Server IP

---

## 0.7.10
*01/29/2018*

- Update Discord.js to `11.3.0`
- Add new server query/monitor for Nightflare Renegades. Usage: `!b ren`
- Handle onDisconect events for Discord's API.

---

## 0.7.9
*01/06/2018*

- Disable SnapLakPub - Server Deprecated
- Add `slt` additional alias for TacoStand query

---

## 0.7.8
*12/09/2017*

- Display the T2 monitor on the T2 Discord #match_summary chan

---

## 0.7.7
*12/06/2017*

- Update TacoStand's IP

---

## 0.7.6
*11/20/2017*

-  *Fix #7* - Specify timezone in server monitor

---

## 0.7.5
*11/13/2017*

**Enhancements**  

-  *Feature Request #4* - BattleBot now has the ability to define multiple root command prefixes 
    **Usage** 

    Call BattleBot with: `!battlebot`,`!bb`, `!b` 

---

## 0.7.4
*11/12/2017*

**Enhancements**  

-  *Feature Request #5* - [Query] Add ability to post/sticky a query indefinitely or override the default timeout.
    **Usage**
    `!battlebot taco post` will post query results indefinitely.
    `!battlebot taco 1` will post query results for 1 minute before auto-deleting.

---

## 0.7.3
*11/12/2017*

**Bug Fixes** 

- [Monitor] Addressed some stability issues if a server was offline during a query
- [Query] If a server is offline during a query, BattleBot will report back if the server is down and no longer hang or say nothing

---

## 0.7.2
*11/09/2017*

- Refactor Monitors to be isolated from commands. Monitors are now loaded and configured independently.

**Enhancements** 

- [Monitor] BattleBot now monitors Midair's active players and reports player count in the #midair channel topic

---
## 0.7.1
*11/04/2017*

- Add Timezone support for monitor

---

## 0.7.0
*11/04/2017*

- Enable TacoStand and add to `t2` query
- Setup local storage adapter with LokiJS
- Code impovements for query lists (async/await) - Replaced generator
- Better formatting of server detail query

**Enhancements** 

- BattleBot now monitors t2 servers and reports back that stats in the topic!

---

## 0.6.1
*10/29/2017*

- Remove TacoStand from `t2` query

---
## 0.6.0
*10/27/2017*

- The help command is now auto documented.
- The `taco` command has been disabled. RIP TacoStand server.
- Refactor codebase. Heavily inspired by the [AnIdiotsGuide](https://github.com/An-Idiots-Guide/guidebot)'s bot framework.


**New Command(s)** 

- `!battlebot stats` Display the health of BattleBot


**Enhancements** 

- Introduce command aliases. For example, `!battlebot lak` will yield the same results as `!battlebot slp`

---

## 0.5.1
*10/19/2017*

**Enhancements** 

- `!battlebot midair` *Midair server list*, now displays a link to join a server listed. *Currently, the steam://connect protocol is not supported so it will just fire-up Midair for you*

---
## 0.5.0
*10/13/2017*

**Enhancements** 

- Introduce CHANGELOG.md
- `!battlebot t2` *Tribes 2 query list*, now displays the gametype
- Sanitize user commands

---