'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useAccount, useWalletClient } from 'wagmi'
import * as z from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

import { useSuperFluidWithWagmiProvider } from '@/superfluid/hooks/use-superfluid-with-wagmi-provider'
import { getPerSecondFlowRate } from '@/superfluid/utils'

const formSchema = z.object({
  receiver: z.string().min(42).max(42),
  token: z.string({
    required_error: 'Please select a Supertoken to stream',
  }),
  amount: z.string(),
})

export default function App() {
  const { data: walletClient, isError, isLoading } = useWalletClient()
  const { address, isConnected } = useAccount()
  // const chainId = useChainId()
  // const infuraUrl = getInfuraUrl(chainId)
  // const provider = new ethers.providers.JsonRpcProvider(`${infuraUrl}/${INFURA_API_KEY}`)
  // const signer = provider.getSigner()
  const sf = useSuperFluidWithWagmiProvider()
  console.log('send flow', sf)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver: '',
      token: '',
      amount: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    const weiAmount = getPerSecondFlowRate(values.amount)
    console.log(weiAmount, 'weiAmount')
    if (!sf || !walletClient) return
    const supertoken = await sf.loadSuperToken(values.token)

    let flowOp = supertoken?.createFlow({
      sender: address,
      receiver: values.receiver,
      flowRate: weiAmount,
    })

    await flowOp?.exec(signer)
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
          <FormField
            control={form.control}
            name="receiver"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base">Receiver</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ethereum address here"
                    className="input text-gray-600 placeholder:text-gray-500 dark:text-gray-600 dark:placeholder:text-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-gray-500"> This is the receivers valid EVM address. </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem className="flex w-1/2 flex-col gap-1">
                  <FormLabel className="text-base">Supertoken</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="input mt-4 text-gray-600 placeholder:text-gray-500 dark:text-gray-600 dark:placeholder:text-gray-500">
                        <SelectValue placeholder="Select a Supertoken to stream" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-white">
                      <SelectItem value="USDCx">USDCx</SelectItem>
                      <SelectItem value="DAIx">DAIx</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-500">Select a Supertoken to stream.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex w-1/2 flex-col gap-1">
                  <FormLabel className="text-base">Amount (Monthly)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="100 / month"
                      className="input  text-gray-600 placeholder:text-gray-500 dark:text-gray-600 dark:placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500"> Amount to stream to receiver, monthly. </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <button className="btn btn-emerald" type="submit" disabled={!isLoading}>
            Submit
          </button>
        </motion.form>
      </Form>

      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <h3 className="text-center">Start a Superfluid Stream</h3>
        <p className="text-center text-sm text-gray-500">
          Enter a valid evm address to receive tokens, select a token to stream & set the monthly amount.
        </p>
      </div>
    </div>
  )
}
