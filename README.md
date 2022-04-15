<!-- header -->
<div id="top" align="center">
  <img src="images/logo.png" alt="BattleBot" width="80" height="80">
  <h2 align="center">BattleBot v2</h2>
  <p align="center">
    An extensible Discord game server query and monitoring bot.
    <br />
    <br />
    <a href="https://github.com/amineo/discord-battlebot"><strong>Add to Discord</strong></a>
    <br />
    <br />
    <a href="https://github.com/amineo/discord-battlebot/issues">Feature Request</a>
    &#8226;
    <a href="https://github.com/amineo/discord-battlebot/issues">Report Bug</a>
    &#8226;
    <a href="https://github.com/amineo/discord-battlebot/tree/v1-node"><em>Legacy: BattleBot v1 (Node)</em></a>
    <br />
    You can see BattleBot in action on the <a href="https://discord.gg/Y4muNvF">Tribes 2 Discord</a>.
  </p>
</div>
<!-- /header -->


<!-- TOC -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-this-project">About This Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>        
      </ul>
    </li>
    <li><a href="#supported-games">Supported Games</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a>
      <ul>
        <li>
          <a href="#getting-started">Getting Started</a>
          <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#installation">Installation</a></li>
          </ul>
        </li>        
      </ul>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
<!-- /TOC -->

<br />

---

<br />


## About This Project

BattleBot [v1](https://github.com/amineo/discord-battlebot/tree/v1-node) was initially written in Node around Fall 2017 
for the [Tribes 2 Discord](https://discord.gg/Y4muNvF) community, allowing users to query Tribes 2 servers in real-time.   

As BattleBot's feature set grew (*some being experimental*), so did its complexity. With BattleBot evolving, therein lies the 
opportunity to learn more Elixir and completely rewrite BattleBot, and its [Tribes 2 server query engine](https://github.com/amineo/t2_server_query_elixir). 
Previously, the query engine was using [qstat](https://github.com/Unity-Technologies/qstat). 
BattleBot's core is now even more modular, including the ability to handle more games, with Tribes 2 being the first.

### Features
#### Application (Slash) Commands

| Slash Command | Description |
| :---          |    :----   |
| `/query t2`   | Query options: `server`, `ip`, `format`. If a server or IP option is not selected, BattleBot will query all servers configured in [config/t2_servers.exs](config/t2_servers.exs) and output the results in an embedded list. |
| | `> server` : Select from a list of predefined servers     |
| | `> ip` : Manually enter a server's IP:PORT to be queried  |
| | `> format` : Output options: `image` *(default)*, `raw`   |
| `/events`     | List server events          |
| `/info`       | Info about BattleBot        |


#### Ephemeral Message Responses
By default, any response BattleBot yields with will automatically be deleted after 5 minutes have passed. This keeps the chat and query outputs tidy. :)

The default message timeout is configurable in [config/config.exs](config/config.exs). This will eventually be an option you can pass into any `/query` command to set a custom timeout.


#### Server Topic Monitoring
`Coming soon! On the roadmap.`

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With
- [Elixir](https://elixir-lang.org/)
- [Nostrum](https://github.com/Kraigie/nostrum)
- T2ServerQuery: [Repo](https://github.com/amineo/t2_server_query_elixir) &#8226; [Docs](https://hexdocs.pm/t2_server_query)
- [t2-server-image](https://github.com/exogen/t2-server-xbar/tree/main/packages/t2-server-image)


<p align="right">(<a href="#top">back to top</a>)</p>
<!-- /About This Project -->



## Supported Games
- Tribes 2
- *Suggest your favorite title :)* 
<p align="right">(<a href="#top">back to top</a>)</p>
<!-- /Supported Games -->



## Roadmap

- [x] Slash commands
- [x] Tribes 2 Server and list queries
- [ ] Custom message timeout option for slash commands
- [ ] Topic Monitoring :: Monitor game server populations and update Discord channel topics


<p align="right">(<a href="#top">back to top</a>)</p>
<!-- /Roadmap -->


## Contributing
Any contributions you make are **greatly appreciated**. If you have a suggestion that would make this better, please fork the repo and create a pull request. I'd love to learn from you!

You can also simply open an issue with the tag "enhancement". **Don't forget to give the project a star!** :)

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Setup any applicable tests for your module or feature in `./test/*.exs`
4. Commit your Changes (`git commit -m 'feat(new): Command to query <insert your favorite game here>'`)
5. Push to the Branch (`git push origin feature/NewFeature`)
6. Open a Pull Request


### Testing, Formatting and Styling
Please run `credo` and `dialyzer` static code analysis on any contributions you make so that we can keep the codebase consistent.

- `mix credo`    : Static Code Analysis
- `mix dialyzer` : Static Code Analysis
- `mix test`     : Test runner
- `mix format`   : Code formatting



### Getting Started
Run BattleBot:
```
iex -S mix
```

#### Prerequisites
- Install Elixir & Erlang : [Guide with ASDF version manager](https://www.pluralsight.com/guides/installing-elixir-erlang-with-asdf)
- The project's Elixir & Erlang versions are found here in: [./elixir_buildpack.config](./elixir_buildpack.config)
- **Not required but recommended**: For VSCode, [ElixirLS: Elixir support and debugger](https://marketplace.visualstudio.com/items?itemName=JakeBecker.elixir-ls)
- **Required Environment Variables**
  - `DISCORD_BOT_TOKEN` : Your secret bot token. ([Create a new bot application](https://discord.com/developers/applications))
  - `TEST_GUILD_ID`  : Your **dev channel** for testing slash commands
  - ~ **TIP:** Using [direnv](https://direnv.net/) can make your life easier for auto loading envs/secrets for a project

#### Installation
```
mix deps.get
```

<p align="right">(<a href="#top">back to top</a>)</p>
<!-- /Contributing -->

## Acknowledgments
- @exogen: [t2-server-image](https://github.com/exogen/t2-server-xbar/tree/main/packages/t2-server-image)
- @ChocoTaco1: [https://github.com/ChocoTaco1/TacoServer](https://github.com/ChocoTaco1/TacoServer), BattleBot Logo
- The Tribes 2 Community
- T2ServerQuery: [Repo](https://github.com/amineo/t2_server_query_elixir) &#8226; [Docs](https://hexdocs.pm/t2_server_query)
- [Nostrum](https://github.com/Kraigie/nostrum)

<p align="right">(<a href="#top">back to top</a>)</p>
<!-- /Acknowledgments -->


## License
[MIT](LICENSE.txt)
<p align="right">(<a href="#top">back to top</a>)</p>
<!-- /License -->
