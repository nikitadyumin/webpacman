%%%-------------------------------------------------------------------
%%% @author ndyumin
%%% @copyright (C) 2016, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 08. Янв. 2016 23:36
%%%-------------------------------------------------------------------
-module(boot).
-author("ndyumin").

%% API
-export([start/0]).

start() ->
  application:start(crypto),
  application:start(bson),
  application:start(mongodb),
  application:start(cowlib),
  application:start(ranch),
  application:start(cowboy),
  application:start(gproc),
  application:start(webpacman).
