%%%-------------------------------------------------------------------
%%% @author ndyumin
%%% @copyright (C) 2016, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 15. Янв. 2016 11:17
%%%-------------------------------------------------------------------
-module(messenger).
-author("ndyumin").

%% API
-export([start/0]).

start() ->
  gproc:reg_other({r, l, messenger},
    spawn(fun() -> loop() end)).

loop() ->
  receive
  % process message from a Connection
    {user_message, Connection, Msg} ->
      dispatch(Connection, Msg), loop();
  % process a new Connection
    {user_connected, Connection} ->
      logic:add_player(Connection), loop();
  % send map update to a single Connection
    {send_map, Connection} ->
      gproc:send({r, l, map}, {get, fun(Map) -> Connection ! protocol:map_update(Map) end}), loop();
  % send out a map update
    {sendout_map} ->
      gproc:send({r, l, players}, {get,
        fun(Players) ->
          gproc:send({r, l, map}, {get,
            fun(Map) ->
              SerializedMap = protocol:map_update(Map),
              lists:map(fun(Pid) -> Pid ! SerializedMap end, maps:keys(Players))
            end})
        end}), loop();
  % send a player update about to itself
    {send_self_update, Connection, Update} ->
      Connection ! protocol:self_update(Update), loop();
  % send out players info to all connections
    {sendout_players} ->
      gproc:send({r, l, players}, {get, fun(Data) -> sendout_player_data(Data) end}), loop()
  end.

dispatch(Connection, Msg) ->
  {Type, Data} = protocol:fe_message(Msg),
  case Type of
    <<"position">> ->
      [
        {<<"x">>, X},
        {<<"y">>, Y}
      ] = Data,
      logic:update_position(Connection, {X, Y})
  end.

sendout_player_data(Players) ->
  Connections = maps:keys(Players),
  PlayerData = maps:values(Players),
  SerializedPlayerData = protocol:user_updates(PlayerData),
  lists:map(fun(Pid) -> Pid ! SerializedPlayerData end, Connections).