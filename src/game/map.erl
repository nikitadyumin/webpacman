%%%-------------------------------------------------------------------
%%% @author ndyumin
%%% @copyright (C) 2016, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 11. Янв. 2016 18:17
%%%-------------------------------------------------------------------
-module(map).
-author("ndyumin").

%% API
-export([start/0, stop/0]).

get_initial() ->
  from_matrix([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 4, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 4, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1],
    [3, 3, 3, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 3, 3, 3],
    [1, 1, 1, 1, 2, 1, 2, 1, 1, 3, 1, 1, 2, 1, 2, 1, 1, 1, 1],
    [0, 0, 0, 0, 2, 2, 2, 1, 3, 3, 3, 1, 2, 2, 2, 0, 0, 0, 0],
    [1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1],
    [3, 3, 3, 1, 2, 1, 2, 2, 2, 0, 2, 2, 2, 1, 2, 1, 3, 3, 3],
    [1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 4, 1],
    [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]).

from_matrix(Matrix) ->
  Lines = lists:map(fun(Line) -> array:from_list(Line) end, Matrix),
  array:from_list(Lines).

to_matrix(Array) ->
  Lines = array:to_list(Array),
  lists:map(fun(Line) -> array:to_list(Line) end, Lines).

set(X, Y, Value, Map) ->
  array:set(X, array:set(Y, Value, array:get(Y, Map)), Map).

start() ->
  MapLoop = spawn(fun() -> map_update_loop(get_initial()) end),
  gproc:reg_other({r, l, map}, MapLoop).

stop() ->
  erlang:error(not_implemented).

map_update_loop(Map) ->
  receive
    {get, Clb} ->
      Clb(to_matrix(Map)),
      map_update_loop(Map);

    {get_at, {X, Y},  Clb} ->
      Clb(array:get(X, array:get(Y, Map))),
      map_update_loop(Map);

    {set, {X, Y}, Value} ->
      map_update_loop(set(X, Y, Value, Map))
  end.