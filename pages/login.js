import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
function Login({ providers }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{
          scale: 0.95,

          border: 'none',
          color: '#000',
        }}
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
              delay: 0.4,
            },
          },
        }}
      >
        <img
          className="mb-5 w-52 pb-5"
          src="https://links.papareact.com/9xl"
          alt=""
        />
      </motion.div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{
              scale: 0.95,
              border: 'none',
              color: '#000',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
          >
            <button
              className="rounded-full bg-[#18D860] p-5 text-white"
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Login with {provider.name}
            </button>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps(context) {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
