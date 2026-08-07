

<!-- header -->
<div id="top" align="center">
  <img src="images/logo.png" alt="BattleBot" width="80" height="80">
  <h2 align="center">BattleBot v2</h2>
  <p align="center">
    Un bot extensible para consultar y monitorear servidores de juegos de Discord.
    <br />
    <br />
    <a href="https://github.com/amineo/discord-battlebot"><strong>Añadir a Discord</strong></a>
    <br />
    <br />
    <a href="https://github.com/amineo/discord-battlebot/issues">Solicitar funcionalidad</a>
    &#8226;
    <a href="https://github.com/amineo/discord-battlebot/issues">Informar error</a>
    &#8226;
    <a href="https://github.com/amineo/discord-battlebot/tree/v1-node"><em>Legacy: BattleBot v1 (Node)</em></a>
    <br />
    Puedes ver BattleBot en acción en el <a href="https://discord.gg/Y4muNvF">Discord de Tribes 2</a>.
  </p>
</div>
<!-- /header -->


<!-- TOC -->
<details>
  <summary>Tabla de Contenidos</summary>
  <ol>
    <li>
      <a href="#about-this-project">Acerca de este proyecto</a>
      <ul>
        <li><a href="#features">Funcionalidades</a></li>
        <li><a href="#built-with">Construido con</a></li>        
      </ul>
    </li>
    <li><a href="#supported-games">Juegos Compatibles</a></li>
    <li><a href="#roadmap">Hoja de Ruta</a></li>
    <li><a href="#contributing">Contribuir</a>
      <ul>
        <li>
          <a href="#getting-started">Primeros Pasos</a>
          <ul>
            <li><a href="#prerequisites">Requisitos Previos</a></li>
            <li><a href="#installation">Instalación</a></li>
          </ul>
        </li>        
      </ul>
    </li>
    <li><a href="#acknowledgments">Agradecimientos</a></li>
    <li><a href="#license">Licencia</a></li>
  </ol>
</details>
<!-- /TOC -->

<br />

---

<br />


## Acerca de este proyecto

BattleBot [v1](https://github.com/amineo/discord-battlebot/tree/v1-node) fue escrito inicialmente en Node alrededor del otoño de 2017 
para la comunidad del [Discord de Tribes 2](https://discord.gg/Y4muNvF), permitiendo a los usuarios consultar servidores de Tribes 2 en tiempo real.   

A medida que el conjunto de características de BattleBot crecía (*algunas experimentales*), también lo hacía su complejidad. Con la evolución de BattleBot, surge la 
oportunidad de aprender más Elixir y reescribir por completo BattleBot y su [motor de consulta de servidores de Tribes 2](https://github.com/amineo/t2_server_query_elixir). 
Anteriormente, el motor de consulta utilizaba [qstat](https://github.com/Unity-Technologies/qstat). 
El núcleo de BattleBot ahora es aún más modular, incluidas las capacidades para manejar más juegos, siendo Tribes 2 el primero.

### Funcionalidades
#### Comandos de Aplicación (Slash)

| Comando Slash | Descripción |
| :---          |    :----   |
| `/query t2`   | Opciones de consulta: `server`, `ip`, `format`. Si no se selecciona una opción de servidor o IP, BattleBot consultará todos los servidores configurados en [config/t2_servers.exs](config/t2_servers.exs) y mostrará los resultados en una lista incrustada. |
| | `> server` : Selecciona de una lista de servidores predefinidos     |
| | `> ip` : Ingresa manualmente la IP:PUERTO del servidor a consultar  |
| | `> format` : Opciones de salida: `image` *(predeterminado)*, `raw`   |
| `/events`     | Listar eventos del servidor          |
| `/info`       | Información sobre BattleBot        |


#### Respuestas de Mensajes Efímeros
De forma predeterminada, cualquier respuesta que genere BattleBot se eliminará automáticamente después de 5 minutos. Esto mantiene el chat y las salidas de consulta ordenados. :)

El tiempo de espera del mensaje predeterminado es configurable en [config/config.exs](config/config.exs). Eventualmente, esto será una opción que puedes pasar a cualquier comando `/query` para establecer un tiempo de espera personalizado.


#### Monitoreo del Tema
`¡Próximamente! En la hoja de ruta.`

<p align="right">(<a href="#top">volver al inicio</a>)</p>

### Construido con
- [Elixir](https://elixir-lang.org/)
- [Nostrum](https://github.com/Kraigie/nostrum)
- T2ServerQuery: [Repositorio](https://github.com/amineo/t2_server_query_elixir) &#8226; [Documentación](https://hexdocs.pm/t2_server_query)
- [t2-server-image](https://github.com/exogen/t2-server-xbar/tree/main/packages/t2-server-image)


<p align="right">(<a href="#top">volver al inicio</a>)</p>
<!-- /About This Project -->



## Juegos Compatibles
- Tribes 2
- *Sugiere tu título favorito :)* 
<p align="right">(<a href="#top">volver al inicio</a>)</p>
<!-- /Supported Games -->



## Hoja de Ruta

- [x] Comandos slash
- [x] Consultas de servidor y lista de Tribes 2
- [ ] Opción de tiempo de espera personalizado para comandos slash
- [ ] Monitoreo de Tema :: Monitorear la población de servidores de juegos y actualizar los temas de los canales de Discord


<p align="right">(<a href="#top">volver al inicio</a>)</p>
<!-- /Roadmap -->


## Contribuir
Cualquier contribución que realices es **muy apreciada**. Si tienes una sugerencia que mejoraría este proyecto, por favor bifurca el repositorio y crea una solicitud de extracción (pull request). ¡Me encantaría aprender de ti!

También puedes simplemente abrir un issue con la etiqueta "enhancement". **¡No olvides dar una estrella al proyecto!** :)

1. Bifurca el Proyecto
2. Crea tu Rama de Funcionalidad (`git checkout -b feature/NuevaFuncionalidad`)
3. Configura las pruebas aplicables para tu módulo o funcionalidad en `./test/*.exs`
4. Realiza el Commit de tus Cambios (`git commit -m 'feat(new): Comando para consultar <inserta tu juego favorito aquí>'`)
5. Push a la Rama (`git push origin feature/NuevaFuncionalidad`)
6. Abre una Solicitud de Extracción (Pull Request)


### Pruebas, Formato y Estilo
Por favor, ejecuta `credo` y `dialyzer` (análisis estático de código) en cualquier contribución que realices para mantener la base de código consistente.

- `mix credo`    : Análisis estático de código
- `mix dialyzer` : Análisis estático de código
- `mix test`     : Ejecutor de pruebas
- `mix format`   : Formato de código



### Primeros Pasos
Ejecuta BattleBot:
```
iex -S mix
```

#### Requisitos Previos
- Instala Elixir & Erlang : [Guía con el administrador de versiones ASDF](https://www.pluralsight.com/guides/installing-elixir-erlang-with-asdf)
- Las versiones de Elixir & Erlang del proyecto se encuentran aquí en: [./elixir_buildpack.config](./elixir_buildpack.config)
- **No obligatorio pero recomendado**: Para VSCode, [ElixirLS: Soporte y depurador de Elixir](https://marketplace.visualstudio.com/items?itemName=JakeBecker.elixir-ls)
- **Variables de Entorno Requeridas**
  - `DISCORD_BOT_TOKEN` : Tu token secreto de bot. ([Crea una nueva aplicación de bot](https://discord.com/developers/applications))
  - `TEST_GUILD_ID`  : Tu **servidor de desarrollo** para probar comandos slash
  - ~ **CONSEJO:** Usar [direnv](https://direnv.net/) puede facilitarte la vida para cargar automáticamente variables/secretos de un proyecto

#### Instalación
```
mix deps.get
```

<p align="right">(<a href="#top">volver al inicio</a>)</p>
<!-- /Contributing -->

## Agradecimientos
- @exogen: [t2-server-image](https://github.com/exogen/t2-server-xbar/tree/main/packages/t2-server-image)
- @ChocoTaco1: [https://github.com/ChocoTaco1/TacoServer](https://github.com/ChocoTaco1/TacoServer), Logotipo de BattleBot
- La comunidad de Tribes 2
- T2ServerQuery: [Repositorio](https://github.com/amineo/t2_server_query_elixir) &#8226; [Documentación](https://hexdocs.pm/t2_server_query)
- [Nostrum](https://github.com/Kraigie/nostrum)

<p align="right">(<a href="#top">volver al inicio</a>)</p>
<!-- /Acknowledgments -->


## Licencia
[MIT](LICENSE.txt)
<p align="right">(<a href="#top">volver al inicio</a>)</p>
<!-- /License -->
