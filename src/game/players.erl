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

-define(INITIAL_SCORE, 0).

start() ->
  PlayersProcess = spawn(fun() -> loop(0, maps:new(), false) end),
  gproc:reg_other({r, l, players}, PlayersProcess).

loop(MaxId, Connections, Update) ->
  case Update of
    true ->
      gproc:send({r, l, messenger}, {sendout_players});
    _ -> ok
  end,
  receive
    {add, Connection} ->
      Self = self(),
      gproc:send({r, l, map}, {get_spawn_position,
        fun({X, Y}) ->
          Self ! {add, Connection, {MaxId, X, Y, ?INITIAL_SCORE}}
        end
      }), loop(MaxId, Connections, false);

    {add, Connection, Value} ->
      gproc:send({r, l, messenger}, {send_self_update, Connection, Value}),
      loop(MaxId + 1, maps:put(Connection, Value, Connections), true);

    {remove, Connection} ->
      loop(MaxId, maps:remove(Connection, Connections), true);

    {get, Clb} ->
      Clb(Connections),
      loop(MaxId, Connections, false);

    {get_one, Connection, Clb} ->
      Clb(maps:get(Connection, Connections)),
      loop(MaxId, Connections, false);

    {add_score, Connection, Score} ->
      {Id, _oldX, _oldY, _oldScore} = maps:get(Connection, Connections),
      loop(MaxId, maps:put(Connection, {Id, _oldX, _oldY, _oldScore + Score}, Connections), true);

    {update, Connection, {X, Y}} ->
      {Id, _oldX, _oldY, Score} = maps:get(Connection, Connections),
      loop(MaxId, maps:put(Connection, {Id, X, Y, Score}, Connections), true)
  end.

stop() ->
  ok.
