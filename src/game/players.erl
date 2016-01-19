%%%-------------------------------------------------------------------
%%% @author ndyumin
%%% @copyright (C) 2016, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 12. Янв. 2016 10:00
%%%-------------------------------------------------------------------
-module(players).
-author("ndyumin").

%% API
-export([start/0, stop/0]).

start() ->
  PlayersProcess = spawn(fun() -> loop(0, maps:new()) end),
  gproc:reg_other({r, l, players}, PlayersProcess).

loop(MaxId, Connections) ->
  receive
    {add, Connection} ->
      loop(MaxId + 1, maps:put(Connection, {MaxId, 1, 1, 0}, Connections));

    {add, Connection, Value} ->
      loop(MaxId + 1, maps:put(Connection, Value, Connections));

    {remove, Connection} ->
      loop(MaxId, maps:remove(Connection, Connections));

    {get, Clb} ->
      Clb(Connections),
      loop(MaxId, Connections);

    {add_score, Connection, Score} ->
      {Id, _oldX, _oldY, _oldScore} = maps:get(Connection, Connections),
      loop(MaxId, maps:put(Connection, {Id, _oldX, _oldY, _oldScore + Score}, Connections));

    {update, Connection, {X, Y}} ->
      {Id, _oldX, _oldY, Score} = maps:get(Connection, Connections),
      loop(MaxId, maps:put(Connection, {Id, X, Y, Score}, Connections))
  end.

stop() ->
  ok.
