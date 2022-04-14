import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { all, ExtendedRequest, ExtendedResponse } from '@/middlewares';
import { aggregateLookupOptions } from '@/utils/aggregate';

const handler = nc<NextApiRequest, NextApiResponse>();
handler.use(all);

handler.get<ExtendedRequest, ExtendedResponse>(async (req, res) => {
  const { type } = req.query;
  const aggregateMatching: Array<any> = [
    {
      $match: {
        type: type,
      },
    },
  ];

  let aggregateOptions: Array<any> = [{ $limit: 20 }, { $sort: { id: 1 } }];

  if (type) {
    aggregateOptions = aggregateMatching.concat(aggregateOptions);
  }

  const results = await req.db
    .collection('cards')
    .aggregate(aggregateOptions.concat(aggregateLookupOptions))
    .toArray();

  results.map((card) => {
    const id = card.id;
    card.external_url = `${process.env.NEXT_URL}/cards/${id}`;
    card.image = `${process.env.NEXT_URL}/asset/${id}.jpg`;
    card.animation_url = `${process.env.NEXT_URL}/asset/${id}.mp4`;
  });

  res.status(200).json(results);
});

export default handler;
