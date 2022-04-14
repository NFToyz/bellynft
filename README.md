# NFToyz Belly NFT

This project was created in less than a week by [@sushiday](https://twitter.com/sushiday) and [@phuson](https://twitter.com/phuson) for the [Hello NFT World Hackathon](https://nft.replit.com).

For more information, see our [Belly.io About](https://belly.io/about) page.

## Update environment variables

- Rename `.env.sample` to `.env`
- Rename `.env.local.sample` to `.env.local`
- Update the missing environment variables

## Setting up the DB

Set up and run MongoDB. Load in the /data/cards.json file into a collection. Update `.env` file and set the proper `MONGODB_URI` and `MONGODB_DB` environment variables.

## Running the development server

Install dependency packages

```bash
yarn
```

Run server on localhost

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- `/recipes` - List of Recipe NFTs
- `/ingredients` - List of Ingredient NFTs
- `/about` - About Page
- `/pantry` - List of NFTs from your connected wallet
- `/cards` - List of all available NFTs (both ingredients and recipes)
- `/cards/{id}` - Individual NFT page
- `/craft/{id}` - Craft new Recipe NFT page
- `/faucet` - Faucet page to mint ingredient NFTs for crafting

## Smart contracts that power this application

- BellyNft: https://mumbai.polygonscan.com/address/0xF2A139F2B75F9Ce3A33c81342094BA4b7E66EF3c
- BellyCrafting: https://mumbai.polygonscan.com/address/0x750bc404257c5b153dbd74997d221fbf5a87340d
- BellyRecipes: https://mumbai.polygonscan.com/address/0x07dfcdae0b47cb0421bad734f27aa6d16969772f
- BellyFaucet: https://mumbai.polygonscan.com/address/0x2985D40668955cBD77B6144ed335DB3702a93E8c
