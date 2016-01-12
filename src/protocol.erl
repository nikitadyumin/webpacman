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
-export([
  map_update/1,
  user_updates/1,
  user_update/1
]).

map_update_raw(Map) ->
  [
    {<<"map">>, Map}
  ].

user_updates_raw(Data) ->
  lists:map(fun(D) -> user_update_raw(D) end, Data).

user_update_raw({Id, X, Y}) ->
  [
    {<<"id">>, Id},
    {<<"x">>, X},
    {<<"y">>, Y}
  ].

user_update(Data) ->
  jsx:encode(user_update_raw(Data)).

map_update(Map) ->
  jsx:encode(map_update_raw(Map)).

user_updates(Data) ->
  jsx:encode(user_updates_raw(Data)).
