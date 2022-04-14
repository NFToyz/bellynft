import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import BellyLogo from '@/components/BellyLogo';

const ingredients = [
  {
    name: 'Sushi Rice',
    id: 1,
    type: 'ingredient',
  },
  {
    name: 'Nori',
    id: 2,
    type: 'ingredient',
  },
  {
    name: 'Cucumber',
    id: 3,
    type: 'ingredient',
  },
];

const recipes = [
  {
    name: 'Kappa Maki',
    id: 4,
    type: 'recipe',
  },
  {
    name: 'Crunchy Shrimp Roll',
    id: 9,
    type: 'recipe',
  },
  {
    name: 'Bacon Crunchy Shrimp Roll',
    id: 11,
    type: 'recipe',
  },
];

export default function Home() {
  const title = `BELLY.`;

  return (
    <Layout title={title}>
      <div className='relative'>
        <div className='fixed top-0 left-0 right-0 z-40'>
          <div className='bg-slate-900'>
            <Banner />
            <Header />
          </div>
          <div className='h-10 bg-gradient-to-b from-slate-900 to-transparent'></div>
        </div>
        <div className='relative z-50 flex flex-col items-center justify-center h-full py-48 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent'>
          <main className='relative z-10 flex flex-col px-10 py-6 mx-auto font-sans'>
            <h1 className='text-gray-100'>
              <BellyLogo height={100} />
              <p className='my-6 text-2xl text-slate-400'>
                A collectible craftable NFT experience.
              </p>
            </h1>
          </main>
        </div>
        <div className='z-0 flex flex-col-reverse items-center justify-between px-10 py-8 my-10 xl:flex-row'>
          <div className='w-full mt-4 xl:w-3/4'>
            <ul className='grid grid-cols-1 gap-y-6 sm:grid-cols-3 gap-x-6'>
              {ingredients.map((card: any, index: number) => (
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
          </div>
          <div className='w-full px-10 mb-10 text-center xl:ml-10 xl:w-1/3'>
            <h2 className='mt-2 mb-6 text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-header bg-clip-text bg-gradient-to-r from-emerald-300 to-lime-500'>
              Collect
            </h2>
            <p className='text-xl leading-relaxed lg:text-2xl xl:text-3xl 2xl:text-4xl lg:leading-relaxed xl:leading-relaxed 2xl:leading-relaxed'>
              Visit the{' '}
              <Link href='/faucet' as={`/faucet`} passHref>
                <a className='font-semibold' href=''>
                  Faucet
                </a>
              </Link>{' '}
              to mint your very own collection of{' '}
              <Link href='/ingredients' as={`/ingredients`} passHref>
                <a className='font-semibold' href=''>
                  Ingredient NFTs
                </a>
              </Link>
            </p>
          </div>
        </div>
        <div className='z-0 flex flex-col items-center justify-between px-10 py-8 my-10 antialiased xl:flex-row'>
          <div className='w-full px-10 mb-10 text-center xl:mr-10 xl:w-1/3'>
            <h2 className='mt-2 mb-6 text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-header bg-clip-text bg-gradient-to-tl from-red-800 via-yellow-500 to-yellow-300'>
              Craft
            </h2>
            <p className='text-xl leading-relaxed lg:text-2xl xl:text-3xl 2xl:text-4xl lg:leading-relaxed xl:leading-relaxed 2xl:leading-relaxed'>
              Check out all our{' '}
              <Link href='/recipes' as={`/recipes`} passHref>
                <a className='font-semibold' href=''>
                  Recipe NFTs
                </a>
              </Link>{' '}
              to see what you can use your{' '}
              <Link href='/ingredients' as={`/ingredients`} passHref>
                <a className='font-semibold' href=''>
                  Ingredients
                </a>
              </Link>{' '}
              to create!
            </p>
          </div>
          <div className='w-full mt-4 xl:w-3/4'>
            <ul className='grid grid-cols-1 gap-y-6 sm:grid-cols-3 gap-x-6'>
              {recipes.map((card: any, index: number) => (
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
          </div>
        </div>
        <div className='z-0 flex items-center justify-center px-10 py-8 my-10 my-48 antialiased'>
          <div className='px-10 text-center'>
            <h2 className='mb-6 text-4xl font-semibold leading-loose text-transparent m3-2 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-header bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500'>
              Stay Tuned
            </h2>
            <p className='text-xl leading-relaxed lg:text-2xl xl:text-3xl 2xl:text-4xl lg:leading-relaxed xl:leading-relaxed 2xl:leading-relaxed'>
              Find out more about who we are and everything we have planned for
              Belly on the{' '}
              <Link href='/about' as={`/about`} passHref>
                <a className='font-semibold' href=''>
                  About
                </a>
              </Link>{' '}
              page!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
