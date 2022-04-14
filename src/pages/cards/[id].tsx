import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import LogoOs from '@/components/LogoOs';

export default function Card({ card }: { card: any }) {
  const isMainnet = !!+(process.env.NEXT_PUBLIC_CHAIN_IS_MAINNET || '0');

  const renderRequiredIngredients = () => {
    if (!card.ingredients) return null;
    return (
      <>
        <h2 className='my-4'>Required Ingredients</h2>
        <ul className='w-full grid grid-cols-1 gap-y-6 sm:grid-cols-4 gap-x-6'>
          {card.ingredients.map((card: any, index: number) => (
            <li
              key={index}
              className={`w-full rounded-lg aspect-w-5 aspect-h-7 transition hover:scale-105 duration-300 border-2 ${
                card.type === 'ingredient'
                  ? 'hover:drop-shadow-[0_25px_25px_rgba(30,130,74,0.45)] border-green-400/30'
                  : 'hover:drop-shadow-[0_25px_25px_rgba(255,106,14,0.35)] border-orange-500/30'
              }`}
            >
              <Link
                href={`/cards/${card.id}`}
                as={`/cards/${card.id}`}
                passHref
              >
                <a href=''>
                  <Image
                    src={`/asset/${card.id}.jpg`}
                    alt={card.name}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                    blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02PvDGAAFRAIi4hX/cQAAAABJRU5ErkJggg=='
                    placeholder='blur'
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  };
  return (
    <Layout title={`${card.name || ''} - BELLY.`}>
      <Banner />
      <Header />
      <div className='w-full px-10 mx-auto mt-4 max-w-screen-xl dark'>
        <div className='grid grid-cols-1 gap-y-10 lg:grid-cols-5 md:grid-cols-2 gap-x-12'>
          <div className='lg:col-span-2 md:grid-cols-1'>
            <video
              key={card.id}
              controls
              autoPlay
              loop
              muted
              className={`border-2 rounded-lg ${
                card.type === 'ingredient'
                  ? 'hover:shadow-[0_0_25px_rgba(30,130,74,0.45)] border-green-400/30'
                  : 'hover:shadow-[0_0_25px_rgba(255,106,14,0.35)] border-orange-500/30'
              }`}
            >
              <source src={`/asset/${card.id}.mp4`} type='video/mp4' />
            </video>
          </div>
          <div className='lg:col-span-3 md:grid-cols-1'>
            <h1
              className={`mb-6 pb-4 text-5xl font-bold text-transparent font-header bg-clip-text bg-gradient-to-tl leading-none ${
                card.ingredients
                  ? 'from-orange-800 via-orange-400 to-yellow-300'
                  : 'from-emerald-800 via-emerald-400 to-emerald-300'
              } `}
            >
              {card.name}
            </h1>

            {card.type === 'recipe' && (
              <Link
                href={`/craft/${card.id}`}
                as={`/craft/${card.id}`}
                passHref
              >
                <a
                  href=''
                  className='flex items-center justify-center w-full px-6 py-1 mb-6 text-lg font-bold bg-green-600 rounded-lg md:w-3/4 lg:w-1/2 focus:ring-2 focus:outline-none focus:ring-green-400 leading-10 text-slate-600 dark:text-slate-100 xl:flex hover:bg-green-400/20'
                >
                  Craft Recipe NFT
                </a>
              </Link>
            )}

            <div className='grid gap-y-4 md:gap-y-6 lg:grid-cols-7 sm:grid-cols-2 gap-x-12'>
              <div className='lg:col-span-2 md:grid-cols-1'>ID</div>
              <div className='lg:col-span-5 md:grid-cols-1'>
                <h2 className='text-lg font-bold text-slate-300'>
                  {card.id.toString().padStart(4, '0')}
                </h2>
              </div>
              <div className='lg:col-span-2 md:grid-cols-1'>Type</div>
              <div className='lg:col-span-5 md:grid-cols-1'>
                <h3
                  className={`font-bold text-lg ${
                    card.type === 'ingredient'
                      ? 'text-emerald-300'
                      : 'text-orange-300'
                  }`}
                >
                  {card.ingredients ? 'Recipe' : 'Ingredient'}
                </h3>
              </div>
              <div className='lg:col-span-2 md:grid-cols-1'>Blockchain</div>
              <div className='truncate lg:col-span-5 md:grid-cols-1'>
                <a
                  href={`https://${
                    !isMainnet ? 'mumbai.' : ''
                  }polygonscan.com/token/${
                    process.env.NEXT_PUBLIC_BELLY_NFT
                  }/?a=${card.id}`}
                  target='_blank'
                  rel='noreferrer'
                  className='font-bold text-sky-500 hover:text-sky-800 dark:hover:text-sky-400'
                >
                  {process.env.NEXT_PUBLIC_BELLY_NFT}
                </a>
              </div>
              <div className='lg:col-span-2 md:grid-cols-1'>
                Secondary Market
              </div>
              <div className='truncate lg:col-span-5 md:grid-cols-1'>
                <a
                  href={`https://${
                    !isMainnet ? 'testnets.' : ''
                  }opensea.io/assets/${!isMainnet ? 'mumbai' : 'matic'}/${
                    process.env.NEXT_PUBLIC_BELLY_NFT
                  }/${card.id}`}
                  title='Buy it on OpenSea'
                  target='_blank'
                  rel='noreferrer'
                  className='px-2 text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'
                >
                  <LogoOs height={26} />
                </a>
              </div>
              <div className='lg:col-span-2 md:grid-cols-1'>Description</div>
              <div className='lg:col-span-5 md:grid-cols-1'>
                <span className='text-slate-300'>{card.description || ''}</span>
              </div>
            </div>

            {renderRequiredIngredients()}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  const { id } = params;
  const result = await fetch(`${process.env.NEXT_URL}/api/cards/${id}`);
  const data = await result.json();

  return {
    props: {
      card: data,
    },
  };
}
