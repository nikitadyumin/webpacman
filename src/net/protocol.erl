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
  user_update/1,
  self_update/1,
  fe_message/1
]).

prepare_player({Id, X, Y, Score}) ->
  [
    {<<"id">>, Id},
    {<<"score">>, Score},
    {<<"x">>, X},
    {<<"y">>, Y}
  ].

self_update(Data) ->
  jsx:encode([
    {<<"type">>, <<"self">>},
    {<<"data">>, prepare_player(Data)}
  ]).

user_update(Data) ->
  jsx:encode([
    {<<"type">>, <<"player">>},
    {<<"data">>, Data}
  ]).

map_update(Map) ->
  jsx:encode([
    {<<"type">>, <<"map">>},
    {<<"data">>, Map}
  ]).

user_updates(Data) ->
  jsx:encode([
    {<<"type">>, <<"players">>},
    {<<"data">>, lists:map(fun(D) -> prepare_player(D) end, Data)}
  ]).

fe_message(Msg) ->
  [
    {<<"type">>, Type},
    {<<"data">>, Data}
  ] = jsx:decode(Msg),
  {Type, Data}.