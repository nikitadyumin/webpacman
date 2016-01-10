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

init(Req, Opts) ->
  gproc:reg({p, l, ws_msg}, ""),
  {cowboy_websocket, Req, Opts}.

websocket_handle({text, Msg}, Req, State) ->
  gproc:send({p, l, ws_msg}, Msg),
  {ok, Req, State};
websocket_handle(_Data, Req, State) ->
  {ok, Req, State}.

websocket_info(Msg, Req, State) ->
  {reply, {text, Msg}, Req, State};
websocket_info(_Info, Req, State) ->
  {ok, Req, State}.