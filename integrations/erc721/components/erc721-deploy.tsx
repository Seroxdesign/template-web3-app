import { FormEvent, useState } from 'react'

import { usePublicClient, useWalletClient } from 'wagmi'

import { BlockExplorerLink } from '@/components/blockchain/block-explorer-link'
import { ContractWriteButton } from '@/components/blockchain/contract-write-button'

import { erc721ABI } from '../abis/erc721-abi'
import { erc721ByteCode } from '../abis/erc721-bytecode'
import { useErc721TokenStorage } from '../hooks/use-erc721-token-storage'

export function ERC721Deploy() {
  const [token, setTokenStorage] = useErc721TokenStorage()
  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [isWaitingTransaction, setIsWaitingTransaction] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [symbol, setSymbol] = useState<string>('')

  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!walletClient) return
    setIsSigning(true)

    let hash: `0x${string}` | undefined
    try {
      hash = await walletClient.deployContract({
        abi: erc721ABI,
        bytecode: erc721ByteCode,
        args: [name, symbol],
      })
    } catch (e) {
      setIsSigning(false)
      return
    }
    setIsSigning(false)
    setIsWaitingTransaction(true)
    try {
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      if (!receipt.contractAddress) return

      setIsWaitingTransaction(false)
      setTokenStorage(receipt.contractAddress)
    } catch (e) {
      setIsWaitingTransaction(false)
    }
  }

  return (
    <div className="card w-full">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
        <label>Symbol</label>
        <input value={symbol} onChange={(e) => setSymbol(e.target.value)} className="input" />
        <ContractWriteButton
          write={Boolean(name && symbol)}
          isLoadingTx={isWaitingTransaction}
          isLoadingWrite={isSigning}
          loadingTxText="Deploying...">
          Deploy
        </ContractWriteButton>
      </form>
      {(token || isWaitingTransaction) && (
        <div className="flex max-w-full flex-wrap items-center justify-between break-words pt-5 pb-2">
          <span className="font-semibold">{token ? 'Mint Contract Address' : 'Deploying contract'}:</span>
          <BlockExplorerLink address={token} />
        </div>
      )}
      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <h3 className="text-center">ERC721 Deploy</h3>
        <p className="text-center text-sm text-gray-500">Deploy a new mintable ERC721 token to any blockchain</p>
      </div>
    </div>
  )
}
