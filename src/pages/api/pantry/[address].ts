import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { all, ExtendedRequest, ExtendedResponse } from '@/middlewares';
import { aggregateLookupOptions } from '@/utils/aggregate';

const handler = nc<NextApiRequest, NextApiResponse>();
handler.use(all);

handler.get<ExtendedRequest, ExtendedResponse>(async (req, res) => {
  const isMainnet = !!+(process.env.NEXT_PUBLIC_CHAIN_IS_MAINNET || '0');
  const { address } = req.query;

  // get user's NFTs
  const baseURL = `https://${
    isMainnet ? 'polygon-mainnet' : 'polygon-mumbai'
  }.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTs/`;
  const fetchURL = `${baseURL}?owner=${address}&contractAddresses[]=${process.env.NEXT_PUBLIC_BELLY_NFT}&withMetadata=false`;

  const result = await fetch(fetchURL, {
    method: 'GET',
    redirect: 'follow',
  });

  const nftData = await result.json();
  if (nftData.totalCount <= 0) {
    return res.status(200).json({});
  }

  const tokenBalances: any = {};
  nftData.ownedNfts.forEach((nft: any) => {
    tokenBalances[parseInt(nft.id.tokenId, 16)] = nft.balance;
  });

  const ids = Object.keys(tokenBalances).map((id) => parseInt(id, 10));
  const results = await req.db
    .collection('cards')
    .aggregate(
      [
        { $match: { id: { $in: ids } } },
        { $limit: 20 },
        { $sort: { id: 1 } },
      ].concat(aggregateLookupOptions)
    )
    .toArray();

  results.map((card) => {
    const id = card.id;
    card.balance = parseInt(tokenBalances[id], 10);
    card.external_url = `${process.env.NEXT_URL}/cards/${id}`;
    card.image = `${process.env.NEXT_URL}/asset/${id}.jpg`;
    card.animation_url = `${process.env.NEXT_URL}/asset/${id}.mp4`;
  });

  res.status(200).json(results);
});

export default handler;
