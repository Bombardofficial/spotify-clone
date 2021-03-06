import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'
import useSpotify from '../hooks/useSpotify'
import Songs from '../components/Songs'
const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log('Something went wrong!', err))
  }, [spotifyApi, playlistId])

  console.log(playlist)

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex cursor-pointer items-center space-x-3 rounded-full 
        bg-black p-1 pr-2  text-white opacity-90 hover:opacity-80"
          onClick={signOut}
        >
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 1,
            },
          },
        }}
      >
        <section
          className={`${color} flex h-80 items-end space-x-7 bg-gradient-to-b to-black p-10 text-white`}
        >
          <img
            className="h-44 w-44 shadow-2xl"
            src={playlist?.images?.[0].url}
            alt=""
          ></img>
          <div>
            <p className="text-xs font-bold md:text-sm xl:text-base">
              PLAYLIST
            </p>
            <h1 className="pt-5 text-2xl font-bold md:text-3xl xl:text-5xl">
              {playlist?.name}
            </h1>
          </div>
        </section>
      </motion.div>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
