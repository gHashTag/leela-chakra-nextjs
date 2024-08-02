import { useEffect, useState } from 'react'

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
import { GameBoard } from '@/components/GameBoard/GameBoard'
// import { useLeelaGame } from 'hooks'
// const miniApp = new MiniApp({
//   headerColor: "#00ae13",
//   backgroundColor: "#00ae13",
//   version: "6.4",
//   botInline: false,
//   createRequestId: () => "1234567890",
// });
// console.log(miniApp, "miniApp");

const currentPlayer = {
  id: '1',
  fullName: 'John Doe',
  plan: 44,
  avatar:
    'https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg',
  intention: 'Win',
  previousPlan: 0,
  isStart: true,
  isFinished: false,
  consecutiveSixes: 0,
  positionBeforeThreeSixes: 0,
  message: 'Ready to play',
}

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
    // style={{
    //   width: '500',
    //   height: '500',
    //   // backgroundColor: "var(--main-background)",
    // }}
    >
      {/* <span>Gameboard</span> */}
      {/* <Background> */}
      <div
        style={{
          height: 100,
          backgroundColor: 'white',
        }}
      />

      <GameBoard players={[currentPlayer]} />
      {/* <Space height={10} />
        <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
        <Space height={300} /> */}
      {/* </Background> */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap bg-white bg-opacity-75 px-2 rounded">
        План 68
      </div>
    </div>
  )
}

export default Gameboard
