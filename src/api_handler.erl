%%%-------------------------------------------------------------------
%%% @author ndyumin
%%% @copyright (C) 2016, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 09. Янв. 2016 20:15
%%%-------------------------------------------------------------------
-module(api_handler).
-author("ndyumin").

%% API
-export([init/2]).
-export([content_types_provided/2]).
-export([to_json/2]).

init(Req, Opts) ->
  {cowboy_rest, Req, Opts}.

content_types_provided(Req, State) ->
  {[
    {<<"application/json">>, to_json}
  ], Req, State}.

to_json(Req, State) ->
  Body = <<"{\"data\": \"api data!\", \"nested\": {\"a\":123}}">>,
  {Body, Req, State}.