'use client'

import { useEffect, useState } from 'react'

// import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import { useAccount, useChainId, useWalletClient } from 'wagmi'

import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

import { useSuperFluidWithWagmiProvider } from '@/superfluid/hooks/use-superfluid-with-wagmi-provider'
import { getInfuraUrl, getPerMonthFlowRate } from '@/superfluid/utils'
// import { INFURA_API_KEY } from '@/superfluid/utils/constants'

type Paging = { take: number; skip?: number; lastId?: string }

export default function App() {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const chainId = useChainId()
  const infuraUrl = getInfuraUrl(chainId)
  console.log({ infuraUrl, chainId })

  // const provider = new ethers.providers.JsonRpcProvider(`${infuraUrl}/${INFURA_API_KEY}`)
  // const signer = provider.getSigner()
  const sf = useSuperFluidWithWagmiProvider()
  const [streams, setStreams] = useState<any[]>()
  const [streamsLoading, setStreamsLoading] = useState(false)
  console.log('delete flow', streams)

  useEffect(() => {
    console.log('sf changed', sf)
  }, [sf])

  useEffect(() => {
    if (!sf || streams) return
    console.log('Fetching streams...')

    const getStreams = async () => {
      try {
        setStreamsLoading(true)
        return await sf?.query.listStreams({
          //use wallet address of user, instead of hardcoded address and checksum so it's uppercase
          sender: address,
        })
      } catch (error) {
        console.error(error)
        setStreamsLoading(false)
      }
    }

    const streamList = getStreams()
    streamList.then((res) => {
      setStreams(res?.data.filter((stream) => stream.currentFlowRate != '0'))
    })
  }, [sf, streams])

  const onSubmit = async (data: any) => {
    //load the token you'd like to use like this
    //note that tokens may be loaded by symbol or by address
    if (!signer || !address) return
    const token = data.token.symbol ?? data.token.address
    const usdcx = await sf?.loadSuperToken(token)

    let flowOp = usdcx?.deleteFlow({
      //use wallet address of user, instead of hardcoded address and checksum so it's uppercase
      sender: address,
      receiver: data.receiver,
    })

    await flowOp?.exec(signer) // should have same address as sender
  }

  //Make this look good.
  return (
    <motion.div
      className="card w-full"
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
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        className="flex flex-col gap-4">
        <h2 className="text-base">Current Streams</h2>
        {streamsLoading && streams?.length === 0 && <p>Loading streams...</p>}
        {!streamsLoading && streams?.length ? (
          <div className="">
            {streams.map((stream, i) => {
              return (
                <div
                  key={`stream-${i}`}
                  className="mb-4 flex justify-between rounded-xl border-[1px] border-neutral-600 bg-neutral-800 p-8 text-neutral-400">
                  <p>Current flow rate: {Number(getPerMonthFlowRate(stream.currentFlowRate)).toFixed(0)} / per month</p>
                  <p style={{ marginLeft: '1em' }}>Receiver: {stream.receiver}</p>
                  <p style={{ marginLeft: '1em' }}>Token: {stream.token.symbol}</p>
                  <button style={{ marginLeft: '1em', backgroundColor: 'black', padding: '0.5em', color: 'white' }} onClick={() => onSubmit(stream)}>
                    Stop Stream
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <p>
            No streams!{' '}
            <LinkComponent className="font-bold text-gray-400" href={'/integration/superfluid/start-flow'}>
              Start a stream.
            </LinkComponent>
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}
