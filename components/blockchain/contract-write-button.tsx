import { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface ContractWriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoadingTx: boolean
  isLoadingWrite: boolean
  write?: boolean
  loadingWriteText?: string
  loadingTxText?: string
  text?: string
}

export const ContractWriteButton = ({
  children,
  className,
  isLoadingTx,
  isLoadingWrite,
  write = true,
  loadingWriteText = 'Sign the transaction in your wallet',
  loadingTxText = 'Writing...',
  ...props
}: ContractWriteButtonProps) => {
  return (
    <button disabled={!write || isLoadingWrite || isLoadingTx} className={cn('btn btn-emerald', className)} {...props}>
      {isLoadingWrite ? loadingWriteText : isLoadingTx ? loadingTxText : children}
    </button>
  )
}
