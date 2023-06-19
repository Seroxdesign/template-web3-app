'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useWalletClient } from 'wagmi'
import * as z from 'zod'

import { useSuperFluidWithWagmiProvider } from '@/actions/superfluid/hooks/use-superfluid-with-wagmi-provider'
import { getWeiAmount } from '@/actions/superfluid/utils/getPerSecondFlowRate'
import { LinkComponent } from '@/components/shared/link-component'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

const formSchema = z.object({
  token: z.string({
    required_error: 'Please select a Supertoken to stream',
  }),
  amount: z.string(),
})

export default function App() {
  // `wagmi` have done away with `useSigner`, replacing with `useWalletClient` but `walletClient` isn't recognised as a signer by Superfluid.
  const { data: walletClient, isError, isLoading } = useWalletClient()
  const sf = useSuperFluidWithWagmiProvider()
  // const chainId = useChainId()
  // const infuraUrl = getInfuraUrl(chainId)
  // const provider = new ethers.providers.JsonRpcProvider(`${infuraUrl}/${INFURA_API_KEY}`)
  // const signer = provider.getSigner()
  // console.log({ provider, chainId })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: '',
      amount: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const weiAmount = getWeiAmount(values.amount)

    if (!sf || !walletClient) return
    const supertoken = await sf.loadSuperToken(values.token)

    //@ts-ignore
    const downgradeOperation = supertoken?.downgrade({
      amount: weiAmount,
    })

    await downgradeOperation?.exec(signer)
  }

  const onSetMaxAmount = () => {
    try {
      console.log('Set max amount to unwrap')
      throw new Error('Max amount not implemented yet')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="card w-full">
      <Form {...form}>
        <motion.form
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          initial="hidden"
          animate="show"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem className="flex  w-1/2 flex-col gap-1">
                  <FormLabel className="text-base">Token to unwrap</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="input mt-4 text-gray-600 placeholder:text-neutral-400 dark:text-gray-600 dark:placeholder:text-neutral-400">
                        <SelectValue placeholder="Select a Supertoken to stream" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-white">
                      <SelectItem value="USDCx">USDCx</SelectItem>
                      <SelectItem value="DAIx">DAIx</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-neutral-400">Select a Supertoken to unwrap.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex w-1/2 flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <FormLabel className="inline-flex text-base">Amount</FormLabel>
                    <div className="flex grow items-center justify-end text-right text-gray-400">
                      <span>
                        {'0.93455'}&nbsp;
                        {'USDCf'}
                      </span>
                      &nbsp;(
                      <a className="inline py-0 font-normal text-emerald-600 shadow-none hover:cursor-pointer" onClick={() => onSetMaxAmount()}>
                        Max
                      </a>
                      )
                    </div>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Amount to unwrap"
                      className="input mt-4 text-gray-600 placeholder:text-neutral-400 dark:text-gray-600 dark:placeholder:text-neutral-400"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-neutral-400"> Amount to unwrap.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <button type="submit" className="btn btn-emerald" aria-disabled="true" disabled={true}>
            Submit
          </button>
        </motion.form>
      </Form>
      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <h3 className="text-center">Superfluid SuperTokens</h3>
        <p className="text-center text-sm text-gray-500">
          Unwrap SuperTokens or wrap them in the{' '}
          <LinkComponent className="font-bold" isExternal href={'https://app.superfluid.finance/wrap'}>
            Superfluid dashboard
          </LinkComponent>
        </p>
      </div>
    </div>
  )
}
