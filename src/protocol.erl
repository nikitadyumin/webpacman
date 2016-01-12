%%%-------------------------------------------------------------------
%%% @author ndyumin
%%% @copyright (C) 2016, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 11. Янв. 2016 20:26
%%%-------------------------------------------------------------------
-module(protocol).
-author("ndyumin").

%% API
-export([map_update/1, user_update/3]).

map_update(Map) ->
  jsx:encode([
    { <<"map">>, Map  }
  ]).

user_update(Id, X, Y) ->
  jsx:encode([
    { <<"id">>, Id },
    { <<"x">>, X },
    { <<"y">>, Y }
  ]).