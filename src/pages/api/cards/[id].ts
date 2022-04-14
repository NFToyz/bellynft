import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { all, ExtendedRequest, ExtendedResponse } from '@/middlewares';
import { aggregateLookupOptions } from '@/utils/aggregate';

const handler = nc<NextApiRequest, NextApiResponse>();
handler.use(all);

handler.get<ExtendedRequest, ExtendedResponse>(async (req, res) => {
  const { id } = req.query;

  const result = await req.db
    .collection('cards')
    .aggregate(
      [
        {
          $match: {
            id: parseInt(String(id), 10),
          },
        },
      ].concat(aggregateLookupOptions)
    )
    .toArray();

  if (result.length > 0) {
    const food = result[0];
    food.external_url = `${process.env.NEXT_URL}/cards/${id}`;
    food.image = `${process.env.NEXT_URL}/asset/${id}.jpg`;
    food.animation_url = `${process.env.NEXT_URL}/asset/${id}.mp4`;
    food.attributes = [
      {
        trait_type: 'ID',
        value: food.id,
      },
      {
        trait_type: 'Type',
        value: food.type,
      },
      {
        trait_type: 'Ingredients',
        value: food.ingredients?.length ?? 0,
      },
    ];

    if (food.ingredients && food.ingredients.length) {
      food.ingredients.map((card: any) => {
        const id = card.id;
        card.external_url = `${process.env.NEXT_URL}/cards/${id}`;
        card.image = `${process.env.NEXT_URL}/asset/${id}.jpg`;
        card.animation_url = `${process.env.NEXT_URL}/asset/${id}.mp4`;
      });
    }

    res.status(200).json(food);
  } else {
    res.status(404).json({ error: `Card ID: ${id} Not Found.` });
  }
});

export default handler;
