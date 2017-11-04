# BattleBot Release Notes

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