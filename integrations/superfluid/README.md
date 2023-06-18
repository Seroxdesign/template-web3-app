# Superfluid - React Hook Integration
This React Hook integrates with Superfluid's `@superfluid-finance` SDK , allowing users to easily send, delete and unwrap payments using the Super Token standard. The Super Token standard can wrap an existing ERC20 token or as a standalone ERC20 token with the Super Token enhancements.


## Features


## API

## Components


## Environment Variables


## File Structure
```
integrations/superfluid
├─ components/
│  ├─ form-delete-flow.tsx
│  ├─ form-unwrap-supertoken.tsx
│  ├─ form-send-flow.tsx
├─ hooks/
│  ├─ use-superfluid-with-wagmi-provider.ts
├─ utils/
│  ├─ getPerSecondFlowRate.ts
├─ types.ts
├─ README.md
```