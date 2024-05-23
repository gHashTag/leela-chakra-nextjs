import { useEffect, useState } from "react";

// import { retrieveLaunchParams, MiniApp, postEvent } from "@tma.js/sdk";
// import dynamic from "next/dynamic";

// import {
//   getRooms,
//   getSelectIzbushkaId,
//   getUser,
//   setUserPhotoUrl,
// } from "@/utils/supabase";
// import { captureExceptionSentry } from "@/utils/sentry";
// import { Spinner } from "@/components/ui/spinner";
import { GameBoard } from "@/components/GameBoard/GameBoard";
// import { useLeelaGame } from 'hooks'
// const miniApp = new MiniApp({
//   headerColor: "#00ae13",
//   backgroundColor: "#00ae13",
//   version: "6.4",
//   botInline: false,
//   createRequestId: () => "1234567890",
// });
// console.log(miniApp, "miniApp");

export const currentPlayer = {
  id: "1",
  fullName: "John Doe",
  plan: 1,
  avatar:
    "https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg",
  intention: "Win",
  previousPlan: 0,
  isStart: true,
  isFinished: false,
  consecutiveSixes: 0,
  positionBeforeThreeSixes: 0,
  message: "Ready to play",
};

const Gameboard = () => {
  //   const { initData, platform } = retrieveLaunchParams();

  // const [isLoading, setLoading] = useState(false)
  // const { t } = useTranslation()
  // const [account] = useAccount()

  // const { currentPlayer, lastRoll, rollDice, message } = useLeelaGame();
  // console.log("message", message);
  // console.log("currentPlayer", currentPlayer);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--main-background)",
      }}
    >
      <span>Gameboard</span>
      {/* <Background> */}
      {/* <Space height={30} />
        <Display title={message} />
        <Space height={20} /> */}
      <GameBoard players={[currentPlayer]} />
      {/* <Space height={10} />
        <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
        <Space height={300} /> */}
      {/* </Background> */}
    </div>
  );
};

export default Gameboard;
