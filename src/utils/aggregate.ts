// https://mongoplayground.net/p/MOxU6fNQf5c
export const aggregateLookupOptions: Array<any> = [
  {
    $addFields: {
      ingredients: {
        $map: {
          input: '$ingredients',
          in: {
            $mergeObjects: [
              '$$this',
              {
                id: {
                  $toInt: '$$this.id',
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: 'cards',
      localField: 'ingredients.id',
      foreignField: 'id',
      as: 'ingredient_details',
    },
  },
  {
    $project: {
      _id: 0,
      id: 1,
      name: 1,
      type: 1,
      description: 1,
      ingredients: {
        $map: {
          input: '$ingredients',
          as: 'i',
          in: {
            $mergeObjects: [
              '$$i',
              {
                $first: {
                  $filter: {
                    input: '$ingredient_details',
                    cond: {
                      $eq: ['$$this.id', '$$i.id'],
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    $project: {
      'ingredients._id': 0,
    },
  },
];
