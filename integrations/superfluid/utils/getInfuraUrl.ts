export const getInfuraUrl = (chainId: number) => {
  switch (chainId) {
    case 1:
      return 'https://mainnet.infura.io/v3'
    case 5:
      return 'https://goerli.infura.io/v3'
    case 137:
      return 'https://polygon-mainnet.infura.io/v3'
    case 80001:
      return 'https://polygon-mumbai.infura.io/v3'
  }
}
