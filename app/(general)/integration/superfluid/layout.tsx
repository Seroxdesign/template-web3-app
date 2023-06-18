'use client'
import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { useAccount } from 'wagmi'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { turboIntegrations } from '@/data/turbo-integrations'

export default function SuperfluidLayout({ children }: { children: ReactNode }) {
  const { address, isConnecting, isDisconnected } = useAccount()
  const classes = 'flex-center flex flex-1 flex-col items-center justify-center'
  const button =
    'bg-gradient-sand flex max-w-fit text-xl font-bold items-center justify-center space-x-2 rounded-full px-5 py-2 text-white transition hover:scale-105'

  return (
    <>
      <div className={classes}>
        <motion.div
          className="max-w-screen-xl px-5 text-center xl:px-0"
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}>
          <Image
            alt="Superfluid Icon"
            className="mx-auto mb-5 invert dark:invert-0"
            src={turboIntegrations.superfluid.imgLight}
            width={100}
            height={100}
          />
          <motion.h1
            className="text-gradient-sand pb-5 text-center text-2xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            Superfluid
          </motion.h1>
          <motion.p className="mt-6 text-center text-gray-500 dark:text-gray-200 md:text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Balancer className="text-xl font-semibold">Start integrating Superfluid streams today</Balancer>
          </motion.p>

          <motion.div className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <LinkComponent isExternal href={turboIntegrations.superfluid.url}>
              <button className="btn btn-primary">Documentation</button>
            </LinkComponent>
          </motion.div>
          {address ? (
            <motion.div className="mx-auto mt-6 flex items-center justify-center space-x-8" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Link href="/integration/superfluid/balance">
                <p className={button}>Balance</p>
              </Link>
              <Link href="/integration/superfluid/start-flow">
                <p className={button}>Start Flow</p>
              </Link>
              <Link href="/integration/superfluid/stop-flow">
                <p className={button}>Stop Flow</p>
              </Link>
            </motion.div>
          ) : (
            <WalletConnect className="mt-8 inline-block" />
          )}
        </motion.div>
      </div>
      <section className="container w-full  max-w-screen-lg lg:mt-10">{children}</section>
    </>
  )
}
