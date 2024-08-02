'use client'
import { useEffect, useRef, useState } from 'react'
import { App, Page, Navbar, Block } from 'konsta/react'
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
import ReactDice, { ReactDiceRef } from 'react-dice-complete'
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
  const reactDice = useRef<ReactDiceRef>(null)

  const rollDone = (totalValue: number, values: number[]) => {
    console.log('individual die values array:', values)
    console.log('total dice value:', totalValue)
  }

  const rollAll = () => {
    reactDice.current?.rollAll()
  }
  //   const { initData, platform } = retrieveLaunchParams();

  // const [isLoading, setLoading] = useState(false)
  // const { t } = useTranslation()
  // const [account] = useAccount()

  // const { currentPlayer, lastRoll, rollDice, message } = useLeelaGame();
  // console.log("message", message);
  // console.log("currentPlayer", currentPlayer);

  return (
    <App theme="ios">
      <Page>
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
          >
            <h1
              style={{
                paddingTop: 20,
                width: '100%',
                textAlign: 'center',
                color: 'black',
                fontSize: '28px',
                fontFamily: 'Arial',
                fontWeight: 'bold',
              }}
            >
              План 68
            </h1>
            <GameBoard players={[currentPlayer]} />
            {/* <Space height={10} />
        <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
        <Space height={300} /> */}
            {/* </Background> */}
            <div
              style={{
                justifyContent: 'center',
                display: 'flex',
                paddingTop: 20,
              }}
            >
              <ReactDice
                numDice={1}
                ref={reactDice}
                rollDone={rollDone}
                faceColor="white"
                dotColor="black"
                outline
                dieSize={80}
              />
            </div>
          </div>
        </div>
      </Page>
    </App>
  )
}

export default Gameboard
