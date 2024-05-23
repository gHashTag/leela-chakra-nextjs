import { useEffect, useReducer, useState } from "react";

import i18next from "i18next";
import { Player } from "@/types";
import { GEM_ICONS } from "../images";

console.log(GEM_ICONS, "GEM_ICONS");

const useLeelaGame = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState({ message: "" });

  // const rollDice = () => {
  //   setLoading(true);
  //   const rollResult = Math.floor(Math.random() * MAX_ROLL) + 1;
  //   getContract(rollResult);
  // };

  // const updatePlayer = (player: Player) => {
  //   dispatch({ type: "UPDATE_PLAYER", player });
  // };

  // const setRollHistory = (rollHistory: number[]) => {
  //   dispatch({ type: "SET_ROLL_HISTORY", rollHistory });
  // };

  // const setPlanHistory = (planHistory: number[]) => {
  //   dispatch({ type: "SET_PLAN_HISTORY", planHistory });
  // };

  return {
    // currentPlayer: state.currentPlayer,
    // rollHistory: state.rollHistory,
    // planHistory: state.planHistory,
    // message: state.message,
    // rollDice,
    // lastRoll: state.lastRoll,
    // updatePlayer,
    // setRollHistory,
    // setPlanHistory,
    // isLoading,
    // isError,
  };
};

export { useLeelaGame };
