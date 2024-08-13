'use client'
import { useEffect, useRef, useState } from 'react'
import { App, Page, Navbar, Block, Preloader } from 'konsta/react'
import { retrieveLaunchParams, MiniApp, postEvent, InitDataParsed } from '@tma.js/sdk'

// import dynamic from "next/dynamic";

// import {
//   getRooms,
//   getSelectIzbushkaId,
//   getUser,
//   setUserPhotoUrl,
// } from "@/utils/supabase";
// import { captureExceptionSentry } from "@/utils/sentry";

import { GameBoard } from '@/components/GameBoard/GameBoard'
import ReactDice, { ReactDiceRef } from 'react-dice-complete'
import { gameStep, getLastStep } from '@/_shared/supabase/game'
import { GameStep, GameStepResultT } from '@/types'
import { supabase } from '@/_shared/supabase'
// import { useLeelaGame } from 'hooks'
// const miniApp = new MiniApp({
//   headerColor: "#00ae13",
//   backgroundColor: "#00ae13",
//   version: "6.4",
//   botInline: false,
//   createRequestId: () => "1234567890",
// });
// console.log(miniApp, "miniApp");

// const currentPlayer = {
//   id: '1',
//   fullName: 'John Doe',
//   plan: 44,
//   avatar:
//     'https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg',
//   intention: 'Win',
//   previousPlan: 0,
//   isStart: true,
//   isFinished: false,
//   consecutiveSixes: 0,
//   positionBeforeThreeSixes: 0,
//   message: 'Ready to play',
// }

interface CurrentPlayerT {
  id: string
  fullName: string
  plan: number
  avatar: string
  intention: string
  previousPlan: number
  isStart: boolean
  isFinished: boolean
}

const Gameboard = () => {
  const [plan, setPlan] = useState<number>(0)
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayerT | null>(null)
  const [initData, setInitData] = useState<InitDataParsed | null>(null)

  useEffect(() => {
    const getParams = async () => {
      try {
        const params = await retrieveLaunchParams()
        console.log('Params:', params)
        setInitData(params.initData || null)
        if (params.initData) {
          await getCurrentUser(params.initData)
        }
      } catch (error) {
        console.error('Ошибка:', error)
      } finally {
      }
    }      
    getParams() 
  }, [])

  const getCurrentUser = async (initData: InitDataParsed, attempts = 3) => {
    try {
      const telegram_id = initData.user?.id.toString()
      if (!telegram_id) {
        throw new Error('No user id')
      }
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('user_id')
        .eq('telegram_id', telegram_id)
        .maybeSingle()
      if (userError) {
        console.error('Ошибка при получении пользователя:', userError)
        if (attempts > 0) {
          return getCurrentUser(initData, attempts - 1)
        }
        throw new Error('Не удалось получить пользователя')
      }
      
      if (!userData) {
        console.error('Пользователь не найден')
        if (attempts > 0) {
          return getCurrentUser(initData, attempts - 1)
        }
        throw new Error('Пользователь не найден')
      }

      const user_id = userData.user_id
      console.log('user_id из Supabase:', user_id)
      const lastStep = await getLastStep(user_id)
      const user = {
        id: telegram_id,
        fullName: initData?.user?.firstName || 'Name',
        plan: lastStep.loka,
        avatar: initData?.user?.photoUrl || 'https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.600.jpg',
        intention: 'Win',
        previousPlan: 0,
        isStart: lastStep.loka === 0,
        isFinished: lastStep.is_finished,
      }
      setPlan(user.plan)
      setCurrentPlayer(user)
    } catch (error) {
      console.error(error)
    }
  }

  // const [isLoading, setLoading] = useState(false)
  // const { t } = useTranslation()
  // const [account] = useAccount()

  // const { currentPlayer, lastRoll, rollDice, message } = useLeelaGame();
  // console.log("message", message);
  // console.log("currentPlayer", currentPlayer);

  const language = initData?.user?.languageCode === 'ru'
  return (
    <App theme="ios">
      <Page>
        {/* <span>Gameboard</span> */}
        {/* <Background> */}
        <div
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: '100%',
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
            {language ? 'План' : 'Plan'} {currentPlayer?.plan || 0}
          </h1>
          {currentPlayer && <GameBoard players={[currentPlayer]} />}
          {/* <Space height={10} />
        <Dice rollDice={rollDice} lastRoll={lastRoll} size="medium" />
        <Space height={300} /> */}
          {/* </Background> */}
          {/* <div
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
          </div> */}
          </div>
        </Page>
    </App>
  )
}

export default Gameboard