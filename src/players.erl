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
  PlayersProcess = spawn(fun() -> players_pool(0, maps:new()) end),
  gproc:reg_other({r, l, players}, PlayersProcess).

dispatch(MaxId, Connections, Msg) ->
  case (Msg) of
    {add, Connection} ->
      {MaxId + 1, maps:put(Connection, {MaxId, 1, 1}, Connections)};

    {add, Connection, Value} ->
      {MaxId + 1, maps:put(Connection, Value, Connections)};

    {remove, Connection} ->
      {MaxId, maps:remove(Connection, Connections)};

    {update, Connection, Value} ->
      {MaxId, maps:put(Connection, Value, Connections)}

  end.

sendout_player_data(Connections) ->
  ConnectionHandlers = maps:keys(Connections),
  PlayerData = maps:values(Connections),
  SerializedPlayerData = protocol:user_updates(PlayerData),
  lists:map(fun(Pid) -> Pid ! SerializedPlayerData end, ConnectionHandlers).

players_pool(MaxId, Connections) ->
  receive
    Msg ->
      {NewMaxId, NewConnections} = dispatch(MaxId, Connections, Msg),
      sendout_player_data(NewConnections),
      players_pool(NewMaxId, NewConnections)
  end.

stop() ->
  ok.
