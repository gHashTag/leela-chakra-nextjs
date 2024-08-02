import React from 'react'
import { Player } from '@/types'
import { Avatar } from '@nextui-org/react'

interface GemProps {
  player: Player
  planNumber: number
  onPress?: () => void
}

const Gem = ({ player, planNumber, onPress }: GemProps) => {
  let source

  if (player?.avatar) {
    if (typeof player.avatar === 'string' && player.avatar !== '') {
      source = player.avatar
    } else if (typeof player.avatar === 'number') {
      source = player.avatar
    }
  }

  const isNumberVisible = !player && planNumber !== 68

  return (
    <div onClick={onPress} className="cursor-pointer">
      <div
        className="flex items-center justify-center"
        data-testid="gem-container"
      >
        {isNumberVisible ? (
          <div
            className="flex items-center justify-center bg-transparent rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-18 2xl:h-18"
            data-testid="gem-number"
          >
            <span className="text-gray-500" data-testid="gem-text">
              {planNumber.toString()}
            </span>
          </div>
        ) : (
          <div className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28">
            {source && (
              <Avatar
                src={source}
                style={{
                  top: '15px',
                }}
                className="w-full h-full rounded-full object-cover"
                data-testid="player-gem-avatar"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { Gem }
