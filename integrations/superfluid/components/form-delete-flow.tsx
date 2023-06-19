'use client'

import { useEffect, useState } from 'react'

// import { ethers } from 'ethers'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import { XOctagon } from 'lucide-react'
import { useAccount, useChainId, useWalletClient } from 'wagmi'

import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { cn } from '@/lib/utils'

import { INFURA_API_KEY } from '../utils/constants'
import { useSuperFluidWithWagmiProvider } from '@/superfluid/hooks/use-superfluid-with-wagmi-provider'
import { getInfuraUrl, getPerMonthFlowRate } from '@/superfluid/utils'
// import { INFURA_API_KEY } from '@/superfluid/utils/constants'

type Paging = { take: number; skip?: number; lastId?: string }

export default function App() {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const chainId = useChainId()
  const infuraUrl = getInfuraUrl(chainId)

  const provider = new ethers.providers.JsonRpcProvider(`${infuraUrl}/${INFURA_API_KEY}`)
  const signer = provider.getSigner()
  const sf = useSuperFluidWithWagmiProvider()
  const [streams, setStreams] = useState<any[]>()
  const [streamsLoading, setStreamsLoading] = useState(true)

  useEffect(() => {
    console.log('sf changed', sf)
  }, [sf])

  useEffect(() => {
    if (!sf || streams) return
    // setStreamsLoading(true)

    const getStreams = async () => {
      try {
        return await sf?.query.listStreams({
          //use wallet address of user, instead of hardcoded address and checksum so it's uppercase
          sender: address,
        })
      } catch (error) {
        console.error(error)
        setStreamsLoading(false)
      } finally {
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
        <h2 className="text-base">Your Streams</h2>
        {streamsLoading && <p>Loading streams...</p>}
        {!streamsLoading && streams?.length ? (
          <table className="overflow-hidden rounded-2xl border border-slate-900 bg-neutral-700 p-1">
            <thead>
              <tr className="bg-slate-400 text-neutral-900 dark:bg-slate-500">
                <th className="p-2 py-3 text-left font-normal">Flow rate</th>
                <th className="p-2 py-3 text-left font-normal">Receiver</th>
                <th className="p-2 py-3 text-left font-normal">Token</th>
                <th className="p-2 py-3 text-left font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="overflow-hidden rounded-2xl">
              {streams.map((stream, i) => {
                //test if i is odd
                const rowClass =
                  i % 2 == 0
                    ? 'bg-slate-200 text-neutral-600 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-neutral-200 hover:text-neutral-900'
                    : 'bg-slate-300 text-neutral-600 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-neutral-200 hover:text-neutral-900'
                const firstClass = i === 0 ? '' : ''
                const lastClass = i === streams.length - 1 ? '' : ''
                return (
                  <tr
                    key={`stream-${i}`}
                    className={cn(
                      'border-b-[1px] border-neutral-600 bg-neutral-800 p-8 text-neutral-400 transition-colors ease-in-out',
                      rowClass,
                      firstClass,
                      lastClass
                    )}>
                    <td className="p-2">{Number(getPerMonthFlowRate(stream.currentFlowRate)).toFixed(0)} / per month</td>
                    <td className="p-2">{stream.receiver}</td>
                    <td className="p-2">{stream.token.symbol}</td>
                    <td className="flex flex-row justify-end p-2">
                      <button
                        className="btn-red inline-flex w-auto items-center rounded-full p-2 font-normal uppercase"
                        onClick={() => onSubmit(stream)}>
                        <XOctagon />{' '}
                        <span aria-label="Stop this flow" className="sr-only">
                          Stop Flow
                        </span>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : undefined}
        {!streamsLoading && streams === undefined ? (
          <p>
            We couldn&apos;t find any streams!{' '}
            <LinkComponent className="font-bold text-gray-400" href={'/integration/superfluid/start-flow'}>
              Start a stream.
            </LinkComponent>
          </p>
        ) : undefined}
      </motion.div>
      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <h3 className="text-center">Superfluid streams</h3>
        <p className="text-center text-sm text-gray-500">
          View & stop any existing Superfluid streams or{' '}
          <LinkComponent className="font-bold text-gray-400" href={'/integration/superfluid/start-flow'}>
            start a new stream
          </LinkComponent>{' '}
          or{' '}
          <LinkComponent className="font-bold text-gray-400" isExternal href={'https://app.superfluid.finance/wrap?upgrade'}>
            wrap some tokens
          </LinkComponent>
          .
        </p>
      </div>
    </motion.div>
  )
}
