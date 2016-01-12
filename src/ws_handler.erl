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
-export([websocket_handle/3]).
-export([websocket_info/3]).

%%% new connection
init(Req, Opts) ->
  gproc:reg({p, l, ws_msg}),
  self() ! protocol:map_update(map:get()),
  self() ! protocol:user_update(<<"name">>, 10, 10),
  {cowboy_websocket, Req, Opts}.

%%% client message
websocket_handle({text, Msg}, Req, State) ->
  gproc:send({p, l, ws_msg}, Msg),
  {ok, Req, State};
websocket_handle(_Data, Req, State) ->
  {ok, Req, State}.

%%% server message
websocket_info(Msg, Req, State) ->
  {reply, {text, Msg}, Req, State}.