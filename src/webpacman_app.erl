-module(webpacman_app).

-behaviour(application).

-export([start/2, stop/1]).

start(_Type, _Args) ->
  messenger:start(),
  players:start(),
  map:start(),
  Dispatch = cowboy_router:compile([
    {'_', [
      {"/websocket", ws_handler, []},
      {"/", cowboy_static, {file, "static/index.html"}},
      {"/api/[...]", api_handler, []},
      {"/[...]", cowboy_static, {dir, "static"}}
    ]}
  ]),
  {ok, _} = cowboy:start_http(http, 3, [{port, 80}], [
    {env, [{dispatch, Dispatch}]}
  ]),
  webpacman_sup:start_link().

stop(_State) ->
  players:stop(),
  map:stop(),
  ok.
