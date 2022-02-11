import React from 'react'
import { motion } from 'framer-motion'
import {
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { HomeIcon, HeartIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  console.log('You picked playlist >>> ', playlistId)
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div
      className="hidden h-screen overflow-y-scroll 
      border-r border-gray-900 p-5 pb-36 pl-8 text-xs
      text-gray-400 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[20rem] lg:text-lg"
    >
      <div className="space-y-4">
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
          <button
            className="item-center flex space-x-2 hover:text-white"
            onClick={function () {
              window.location = 'https://github.com/Bombardofficial'
            }}
          >
            <p className="italic">Made by Botond Kovács</p>
          </button>
        </motion.div>

        <img
          className="mb-5 w-40 pb-4 pt-2"
          src="https://i.postimg.cc/kg4srpPk/0x0-18-183789-spotify-png.png"
          alt=""
        />

        <div className="text-xl">
          <button className="item-center flex space-x-2 pb-4 hover:text-white">
            <HomeIcon className="h-8 w-8" />
            <p className="pt-1 pl-3">Home</p>
          </button>
          <button className="item-center flex space-x-2 pb-4 hover:text-white">
            <SearchIcon className="h-8 w-8" />
            <p className="pt-1 pl-3">Search</p>
          </button>
          <button className="item-center flex space-x-2 pb-10 hover:text-white">
            <LibraryIcon className="h-8 w-8" />
            <p className="pt-1 pl-3">Your Library</p>
          </button>

          <button className="item-center flex space-x-2  pb-4 hover:text-white">
            <PlusCircleIcon className="h-8 w-8" />
            <p className="pt-1 pl-3">Create Playlist</p>
          </button>

          <button className="item-center flex space-x-2  pb-4 hover:text-white">
            <HeartIcon className="h-8 w-8 text-blue-500" />
            <p className="pt-1 pl-3">Liked Songs</p>
          </button>

          <button className="item-center flex space-x-2 pb-5 hover:text-white">
            <RssIcon className="h-8 w-8 text-green-500" />
            <p className="pt-1 pl-3">Your episodes</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-600" />
        </div>
        {/*playlist*/}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  )
}

export default Sidebar
