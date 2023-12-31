// Generated by @wagmi/cli@0.1.11 on 6/9/2023 at 9:38:30 AM
import {
  UseContractConfig,
  UseContractEventConfig,
  UseContractReadConfig,
  UseContractWriteConfig,
  UsePrepareContractWriteConfig,
  useContract,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { PrepareWriteContractResult, ReadContractResult, WriteContractMode } from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// starter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const starterABI = [
  { constant: true, payable: false, stateMutability: 'view', type: 'function', inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }] },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: 'success', type: 'bool' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: 'success', type: 'bool' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', type: 'uint256' }],
  },
  { constant: true, payable: false, stateMutability: 'view', type: 'function', inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }] },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' },
    ],
    name: 'allowed',
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  { constant: true, payable: false, stateMutability: 'view', type: 'function', inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }] },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: 'success', type: 'bool' }],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
  },
  {
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_initialAmount', type: 'uint256' },
      { name: '_tokenName', type: 'string' },
      { name: '_decimalUnits', type: 'uint8' },
      { name: '_tokenSymbol', type: 'string' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_from', type: 'address', indexed: true },
      { name: '_to', type: 'address', indexed: true },
      { name: '_value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_owner', type: 'address', indexed: true },
      { name: '_spender', type: 'address', indexed: true },
      { name: '_value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContract}__ with `abi` set to __{@link starterABI}__.
 */
export function useStarter(config: Omit<UseContractConfig, 'abi'> = {} as any) {
  return useContract({ abi: starterABI, ...config })
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link starterABI}__.
 */
export function useStarterRead<TFunctionName extends string, TSelectData = ReadContractResult<typeof starterABI, TFunctionName>>(
  config: Omit<UseContractReadConfig<typeof starterABI, TFunctionName, TSelectData>, 'abi'> = {} as any
) {
  return useContractRead({ abi: starterABI, ...config } as UseContractReadConfig<typeof starterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"name"`.
 */
export function useStarterName<TSelectData = ReadContractResult<typeof starterABI, 'name'>>(
  config: Omit<UseContractReadConfig<typeof starterABI, 'name', TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: starterABI, functionName: 'name', ...config } as UseContractReadConfig<typeof starterABI, 'name', TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useStarterTotalSupply<TSelectData = ReadContractResult<typeof starterABI, 'totalSupply'>>(
  config: Omit<UseContractReadConfig<typeof starterABI, 'totalSupply', TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: starterABI, functionName: 'totalSupply', ...config } as UseContractReadConfig<
    typeof starterABI,
    'totalSupply',
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"balances"`.
 */
export function useStarterBalances<TSelectData = ReadContractResult<typeof starterABI, 'balances'>>(
  config: Omit<UseContractReadConfig<typeof starterABI, 'balances', TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: starterABI, functionName: 'balances', ...config } as UseContractReadConfig<
    typeof starterABI,
    'balances',
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"decimals"`.
 */
export function useStarterDecimals<TSelectData = ReadContractResult<typeof starterABI, 'decimals'>>(
  config: Omit<UseContractReadConfig<typeof starterABI, 'decimals', TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: starterABI, functionName: 'decimals', ...config } as UseContractReadConfig<
    typeof starterABI,
    'decimals',
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"allowed"`.
 */
export function useStarterAllowed<TSelectData = ReadContractResult<typeof starterABI, 'allowed'>>(
  config: Omit<UseContractReadConfig<typeof starterABI, 'allowed', TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: starterABI, functionName: 'allowed', ...config } as UseContractReadConfig<typeof starterABI, 'allowed', TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useStarterBalanceOf<TSelectData = ReadContractResult<typeof starterABI, 'balanceOf'>>(
  config: Omit<UseContractReadConfig<typeof starterABI, 'balanceOf', TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: starterABI, functionName: 'balanceOf', ...config } as UseContractReadConfig<
    typeof starterABI,
    'balanceOf',
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"symbol"`.
 */
export function useStarterSymbol<TSelectData = ReadContractResult<typeof starterABI, 'symbol'>>(
  config: Omit<UseContractReadConfig<typeof starterABI, 'symbol', TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: starterABI, functionName: 'symbol', ...config } as UseContractReadConfig<typeof starterABI, 'symbol', TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"allowance"`.
 */
export function useStarterAllowance<TSelectData = ReadContractResult<typeof starterABI, 'allowance'>>(
  config: Omit<UseContractReadConfig<typeof starterABI, 'allowance', TSelectData>, 'abi' | 'functionName'> = {} as any
) {
  return useContractRead({ abi: starterABI, functionName: 'allowance', ...config } as UseContractReadConfig<
    typeof starterABI,
    'allowance',
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link starterABI}__.
 */
export function useStarterWrite<TMode extends WriteContractMode, TFunctionName extends string>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<TMode, PrepareWriteContractResult<typeof starterABI, string>['abi'], TFunctionName>
    : UseContractWriteConfig<TMode, typeof starterABI, TFunctionName> & {
        abi?: never
      } = {} as any
) {
  return useContractWrite<TMode, typeof starterABI, TFunctionName>({ abi: starterABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"approve"`.
 */
export function useStarterApprove<TMode extends WriteContractMode>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<TMode, PrepareWriteContractResult<typeof starterABI, 'approve'>['abi'], 'approve'> & { functionName?: 'approve' }
    : UseContractWriteConfig<TMode, typeof starterABI, 'approve'> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any
) {
  return useContractWrite<TMode, typeof starterABI, 'approve'>({ abi: starterABI, functionName: 'approve', ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useStarterTransferFrom<TMode extends WriteContractMode>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<TMode, PrepareWriteContractResult<typeof starterABI, 'transferFrom'>['abi'], 'transferFrom'> & {
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<TMode, typeof starterABI, 'transferFrom'> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any
) {
  return useContractWrite<TMode, typeof starterABI, 'transferFrom'>({ abi: starterABI, functionName: 'transferFrom', ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"transfer"`.
 */
export function useStarterTransfer<TMode extends WriteContractMode>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<TMode, PrepareWriteContractResult<typeof starterABI, 'transfer'>['abi'], 'transfer'> & { functionName?: 'transfer' }
    : UseContractWriteConfig<TMode, typeof starterABI, 'transfer'> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any
) {
  return useContractWrite<TMode, typeof starterABI, 'transfer'>({ abi: starterABI, functionName: 'transfer', ...config } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link starterABI}__.
 */
export function usePrepareStarterWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof starterABI, TFunctionName>, 'abi'> = {} as any
) {
  return usePrepareContractWrite({ abi: starterABI, ...config } as UsePrepareContractWriteConfig<typeof starterABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareStarterApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof starterABI, 'approve'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: starterABI, functionName: 'approve', ...config } as UsePrepareContractWriteConfig<
    typeof starterABI,
    'approve'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareStarterTransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof starterABI, 'transferFrom'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: starterABI, functionName: 'transferFrom', ...config } as UsePrepareContractWriteConfig<
    typeof starterABI,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link starterABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareStarterTransfer(
  config: Omit<UsePrepareContractWriteConfig<typeof starterABI, 'transfer'>, 'abi' | 'functionName'> = {} as any
) {
  return usePrepareContractWrite({ abi: starterABI, functionName: 'transfer', ...config } as UsePrepareContractWriteConfig<
    typeof starterABI,
    'transfer'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link starterABI}__.
 */
export function useStarterEvent<TEventName extends string>(config: Omit<UseContractEventConfig<typeof starterABI, TEventName>, 'abi'> = {} as any) {
  return useContractEvent({ abi: starterABI, ...config } as UseContractEventConfig<typeof starterABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link starterABI}__ and `eventName` set to `"Transfer"`.
 */
export function useStarterTransferEvent(config: Omit<UseContractEventConfig<typeof starterABI, 'Transfer'>, 'abi' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: starterABI, eventName: 'Transfer', ...config } as UseContractEventConfig<typeof starterABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link starterABI}__ and `eventName` set to `"Approval"`.
 */
export function useStarterApprovalEvent(config: Omit<UseContractEventConfig<typeof starterABI, 'Approval'>, 'abi' | 'eventName'> = {} as any) {
  return useContractEvent({ abi: starterABI, eventName: 'Approval', ...config } as UseContractEventConfig<typeof starterABI, 'Approval'>)
}
