// use-superfluid-with-wagmi-provider.tsx
import { useEffect, useState } from 'react'

import { Framework } from '@superfluid-finance/sdk-core'
import { ethers } from 'ethers'
import { useChainId, useWalletClient } from 'wagmi'

import { getInfuraUrl } from '@/superfluid/utils'
import { INFURA_API_KEY } from '@/superfluid/utils/constants'

//for sero, use the useQuery hook instead of useEffect
export function useSuperFluidWithWagmiProvider() {
  const { data: walletClient } = useWalletClient()
  const chainId = useChainId()
  const [infuraUrl, setInfuraUrl] = useState<string>(getInfuraUrl(chainId) ?? '')
  const provider = new ethers.providers.JsonRpcProvider(`${infuraUrl}/${INFURA_API_KEY}`)
  const [sfFramework, setSfFramework] = useState<Framework>()

  useEffect(() => {
    const getFramework = async () => {
      try {
        if (!provider) return
        return await Framework.create({
          chainId,
          provider: provider,
        })
      } catch (error) {
        console.error(error)
      }
    }
    getFramework().then((res) => setSfFramework(res))
  }, [])

  return sfFramework
}
