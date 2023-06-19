'use client'
import React from 'react'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'

import FormDowngradeSupertoken from '@/superfluid/components/form-unwrap-super-token'

export default function page() {
  return (
    <BranchIsWalletConnected>
      <FormDowngradeSupertoken />
    </BranchIsWalletConnected>
  )
}
