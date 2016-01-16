%%%-------------------------------------------------------------------
%%% @author ndyumin
%%% @copyright (C) 2016, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 08. Янв. 2016 22:02
%%%-------------------------------------------------------------------
-module(ws_handler).
-author("ndyumin").

-export([init/2]).
-export([terminate/3]).
-export([websocket_handle/3]).
-export([websocket_info/3]).

%%% new connection
init(Req, Opts) ->
  gproc:send({r, l, messenger}, {user_connected, self()}),
  {cowboy_websocket, Req, Opts}.

%%% client message
websocket_handle({text, Msg}, Req, State) ->
  gproc:send({r, l, messenger}, {user_message, self(), Msg}),
  {ok, Req, State};
websocket_handle(_Data, Req, State) ->
  {ok, Req, State}.

%%% server message
websocket_info(Msg, Req, State) ->
  {reply, {text, Msg}, Req, State}.

%%% on disconnect
terminate(_, _, _) ->
  gproc:send({r, l, players}, {remove, self()}).