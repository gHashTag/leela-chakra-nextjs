'use client'
import { useEffect, useRef, useState } from 'react'
import { App, Page, Navbar, Block } from 'konsta/react'
import { retrieveLaunchParams, MiniApp, postEvent } from '@tma.js/sdk'

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
import { gameStep } from '@/_shared/supabase/game'
import { GameStep, GameStepResultT } from '@/types'
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
  const { initData, platform } = retrieveLaunchParams()
  console.log('initData', initData)
  console.log('platform', platform)

  const [roll, setRoll] = useState(0)
  const [plan, setPlan] = useState<number>(0)
  const reactDice = useRef<ReactDiceRef>(null)

  const rollDone = (totalValue: number, values: number[]) => {
    console.log('individual die values array:', values)
    console.log('total dice value:', totalValue)
    setRoll(totalValue)
  }

  const rollAll = () => {
    reactDice.current?.rollAll()
  }

  useEffect(() => {
    // hmsActions.setLocalAudioEnabled(true);
    // hmsActions.setLocalVideoEnabled(false);
    const initRoom = async () => {
      try {
        // 1 - получаем userid
        const telegram_id = initData?.user?.id.toString()
        console.log(telegram_id, 'telegram_id')
        if (!telegram_id) {
          throw new Error('No user id')
        }
        // 2 - запросить current plan
        const response: GameStep[] = [
          {
            loka: 11,
            direction: 'step 🚶🏼',
            consecutive_sixes: 0,
            position_before_three_sixes: 0,
            is_finished: false,
          },
        ]
        // 4 - запрашиваем update plan
        // roll,
        // response,
        // telegram_id,
        const updatePlan = await gameStep({ roll, response, telegram_id })
        console.log(updatePlan, 'updatePlan')
        setPlan(updatePlan.response[0].loka)
      } catch (error) {
        console.error(error)
      }
    }
    initRoom()
  }, [initData])

  // const [isLoading, setLoading] = useState(false)
  // const { t } = useTranslation()
  // const [account] = useAccount()

  // const { currentPlayer, lastRoll, rollDice, message } = useLeelaGame();
  // console.log("message", message);
  // console.log("currentPlayer", currentPlayer);

  return (
    <App theme="ios">
      <Page>
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
            План {plan}
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
      </Page>
    </App>
  )
}

export default Gameboard
