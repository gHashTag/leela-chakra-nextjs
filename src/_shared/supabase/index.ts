import { GameStepResultT } from '@/types'
import { createClient } from '@supabase/supabase-js'

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error('Missing Supabase credentials')
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function gameStep({
  roll,
  response,
  telegram_id,
}: GameStepResultT) {
  // Найти user_id по telegram_id
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('user_id')
    .eq('telegram_id', telegram_id)
    .single()

  if (userError) {
    throw new Error(`${userError.message}`)
  }

  const user_id = userData.user_id

  const { data: stepData, error: stepError } = await supabase.functions.invoke(
    'game-step',
    {
      body: JSON.stringify({
        roll: roll,
        result: [...response],
      }),
    }
  )
  if (stepError) {
    throw stepError
  }

  console.log(stepData, 'stepData')

  // Внести объект stepData в таблицу game
  const { data: gameInfo, error: gameError } = await supabase
    .from('game')
    .insert({
      user_id: user_id,
      roll: roll,
      loka: stepData.loka,
      previous_loka: stepData.previous_loka,
      direction: stepData.direction,
      consecutive_sixes: stepData.consecutive_sixes,
      position_before_three_sixes: stepData.position_before_three_sixes,
      is_finished: stepData.is_finished,
    })

  console.log(gameInfo, 'gameInfo')
  if (gameError) {
    throw new Error(gameError.message)
  }

  console.log(stepData, 'stepData')
  return stepData
}
