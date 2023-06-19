# Superfluid - React Hook Integration
This React Hook integrates with Superfluid's `@superfluid-finance` SDK , allowing users to easily send, delete and unwrap payments using the Super Token standard. The Super Token standard can wrap an existing ERC20 token or as a standalone ERC20 token with the Super Token  enhancements.


## Features



## API

## Components

### `form-delete-flow.tsx`
Lists the currently connected wallets streams & the user can stop streams from here.

### `form-send-flow.tsx`
The user can start a new flow to any valid EVM compatible wallet address.

### `form-unwrap-super-token.tsx`
The user can unwrap any SuperToken that they hold in their wallet

### `use-superfluid-with-wagmi-provider.ts`
A hook to tie in wagmi with Superfluid and initialize the Superfluid Framework


## Environment Variables
You will need to copy `.env.example` to a new file called `.env` and at least add random strings to the values for the integrations you're not using. The Superfluid integration only needs `NEXT_PUBLIC_INFURA_API_KEY` to be set properly if you're using Infura or `NEXT_PUBLIC_ALCHEMY_API_KEY` for Alchemy.

## File Structure

### Integration
```
integrations/superfluid
├─ components/
│  ├─ form-delete-flow.tsx
│  ├─ form-unwrap-supertoken.tsx
│  ├─ form-send-flow.tsx
├─ hooks/
│  ├─ use-superfluid-with-wagmi-provider.ts
├─ utils/
│  ├─ constants.ts
│  ├─ getInfuraUrls.ts
│  ├─ getPerSecondFlowRate.ts
│  ├─ index.ts
├─ types.d.ts
├─ README.md
```

### Application
```
app/(general)/integrations/superfluid
├─ start-flow
│  ├─ page.tsx
├─ stop-flow
│  ├─ page.tsx
├─ balance
│  ├─ page.tsx
├─ layout.tsx
├─ opengraph-image.tsx
├─ page.tsx
├─ twitter-image.tsx
```