import useSWR from 'swr';
import { useState, useRef, useCallback } from 'react';
import { useAccount, useContractWrite, useNetwork } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { CreateTypes } from 'canvas-confetti';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import Loader from '@/components/Loader';

import bellyNftAbi from '@/abi/BellyNft.json';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

export default function Crafting({ card }: { card: any }) {
  const isMainnet = !!+(process.env.NEXT_PUBLIC_CHAIN_IS_MAINNET || '0');
  const [{ data: networkData }, switchNetwork] = useNetwork();
  const networkChain = networkData?.chains[isMainnet ? 1 : 0];

  const [{ data: accountData }] = useAccount();
  const [
    {
      data: contractWriteData,
      error: contractWriteError,
      loading: contractWriteLoading,
    },
    craftRecipe,
  ] = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_BELLY_NFT || '',
      contractInterface: bellyNftAbi.abi,
    },
    'craft',
    {
      args: [card.id],
    }
  );

  // https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/getnfts
  const { data, error } = useSWR(
    accountData?.address ? `/api/pantry/${accountData?.address}` : null,
    fetcher
  );

  const isWalletConnected = accountData && accountData?.address && !error;

  const refAnimationInstance = useRef<CreateTypes | null | undefined>();
  const getInstance = useCallback(
    (instance: CreateTypes | null | undefined) => {
      refAnimationInstance.current = instance;
    },
    []
  );
  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.3 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);
  const fireConfetti = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 130,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 170,
      startVelocity: 40,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 200,
      startVelocity: 60,
    });
  }, [makeShot]);

  // convert ingredients to mapping for easy lookup
  const ingredientMapping: any = {};
  data &&
    data.length > 0 &&
    data.forEach((c: any) => {
      ingredientMapping[c.id] = c;
    });

  // check to see if wallet has enough NFTs
  const requiredIngredients = Object.keys(ingredientMapping).map((e) =>
    parseInt(e, 10)
  );
  const difference = card.ingredients
    .map((c: any) => c.id)
    .filter((x: number) => requiredIngredients.indexOf(x) === -1);

  const [isCrafting, setIsCrafting] = useState(false);
  const [isCraftingDone, SetIsCraftingDone] = useState(false);
  const craft = async () => {
    const tx = await craftRecipe();
    setIsCrafting(true);
    const result = await tx.data?.wait();

    // tx done from blockchain
    setIsCrafting(false);

    if (typeof result !== 'undefined') {
      SetIsCraftingDone(true);
      fireConfetti();
    }
  };

  const renderStatusMessage = () => {
    // should not return any error message if crafting is done
    if (isCraftingDone) {
      return null;
    }

    if (networkData.chain?.unsupported) {
      return (
        <div className='flex flex-row  items-center justify-between p-4 py-3 my-4 bg-red-600 rounded-lg text-md text-slate-200'>
          Please connect to the supported network before proceeding.{' '}
          {switchNetwork && (
            <button
              className='flex items-center justify-center px-6 py-3 text-lg font-bold bg-green-700 rounded-lg focus:ring-2 focus:outline-none focus:ring-green-400 text-slate-600 dark:text-slate-100 xl:flex hover:bg-green-500'
              onClick={() => {
                try {
                  switchNetwork(networkChain.id);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Switch to {networkChain.name}
            </button>
          )}
        </div>
      );
    }

    if (!accountData?.address) {
      return (
        <div className='p-4 py-3 my-4 bg-red-600 rounded-lg text-md text-slate-200'>
          Please connect your wallet first.
        </div>
      );
    }

    if (error) {
      return (
        <div className='p-4 py-3 my-4 bg-red-600 rounded-lg text-md text-slate-200'>
          Failed to load
        </div>
      );
    }

    if (!data) {
      return (
        <div className='p-4 py-3 my-4 bg-green-600 rounded-lg text-md text-slate-200'>
          Loading NFTs from your wallet...
        </div>
      );
    }

    if (difference && difference.length) {
      return (
        <div className='p-4 py-3 my-4 bg-red-600 rounded-lg text-md text-slate-200'>
          You do not have the required components to craft this Recipe NFT
        </div>
      );
    }

    if (contractWriteError) {
      return (
        <div className='p-4 py-3 my-4 bg-red-600 rounded-lg text-md text-slate-200'>
          {contractWriteError.message}
        </div>
      );
    }
  };

  const canCraft = Boolean(
    isWalletConnected &&
      difference &&
      difference.length <= 0 &&
      !networkData.chain?.unsupported
  );

  const renderCraftingInProgressContent = () => (
    <div className='p-6 my-6 rounded-lg lg:col-span-2 bg-slate-500/20'>
      <div
        className={`grid grid-cols-1 gap-y-10 lg:grid-cols-4 md:grid-cols-2 gap-x-8`}
      >
        <div className='lg:col-span-2 md:grid-cols-2'>
          <video controls autoPlay loop muted className='rounded-lg'>
            <source src={`/asset/${card.id}.mp4`} type='video/mp4' />
          </video>
        </div>
        <div className='py-10 lg:col-span-2 md:grid-cols-2'>
          <h2 className='mb-6 text-3xl leading-snug text-slate-200'>
            {!isCraftingDone
              ? 'Crafting in progress...'
              : 'Recipe NFT has been crafted!'}
          </h2>
          {!isCraftingDone && contractWriteData && (
            <>
              <p className='mb-6 text-slate-300 text-md'>
                Transaction has been submitted to the blockchain.
              </p>
              <p className='mb-6 text-slate-300 text-md'>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={`https://${
                    !isMainnet ? 'mumbai.' : ''
                  }polygonscan.com/tx/${contractWriteData.hash}`}
                  className='font-bold text-sky-500'
                >
                  Click here to see more information
                </a>{' '}
                about your transaction.
              </p>
            </>
          )}
          {isCraftingDone && (
            <>
              <p className='mb-6 text-slate-300 text-md'>
                Your new recipe NFT should now be in{' '}
                <Link href={`/pantry`} as={`/pantry`} passHref>
                  <a href='' className='font-bold text-sky-500'>
                    My Pantry.
                  </a>
                </Link>
              </p>
            </>
          )}

          <div>
            <h3 className='mb-4 text-xl leading-snug text-slate-300'>
              Used Ingredient NFTs:
            </h3>
            <ul className='grid grid-cols-1 gap-y-6 sm:grid-cols-3 gap-x-5 xl:grid-cols-4'>
              {card.ingredients.map((card: any, index: number) => (
                <li
                  key={index}
                  className={`w-full rounded-lg aspect-w-5 aspect-h-7 border-2 ${
                    card.type === 'ingredient'
                      ? 'border-green-400/40'
                      : 'border-orange-500/40'
                  }`}
                >
                  <Image
                    src={`/asset/${card.id}.jpg`}
                    alt={card.name}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                    blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02PvDGAAFRAIi4hX/cQAAAABJRU5ErkJggg=='
                    placeholder='blur'
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCraftingContent = () => (
    <div className='mt-6 grid grid-cols-1 lg:grid-cols-6'>
      <div className='p-6 lg:col-span-4 bg-red-500/20'>
        <h2 className='mb-2 text-2xl text-slate-300'>Component NFTs</h2>
        <p className='mb-6 text-red-400 text-md'>You will lose these NFTs!</p>
        <ul className='grid grid-cols-1 gap-y-6 sm:grid-cols-3 gap-x-5 xl:grid-cols-4'>
          {card.ingredients.map((card: any, index: number) => (
            <li
              key={index}
              className={`w-full rounded-lg aspect-w-5 aspect-h-7 border-2 ${
                card.type === 'ingredient'
                  ? 'hover:drop-shadow-[0_25px_25px_rgba(30,130,74,0.45)] border-green-400/40'
                  : 'hover:drop-shadow-[0_25px_25px_rgba(255,106,14,0.35)] border-orange-500/40'
              } ${
                !(data && ingredientMapping[card.id]) &&
                'grayscale opacity-50 hover:opacity-100'
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
      <div className='p-6 lg:col-span-2 bg-green-500/20'>
        <h2 className='mb-2 text-2xl text-slate-300'>Recipe NFT</h2>
        <p className='mb-6 text-green-500 text-md'>
          You will receive the following NFT.
        </p>
        <ul>
          <li
            className={`w-full rounded-lg aspect-w-5 aspect-h-7 border-2 border-orange-500/50`}
          >
            <Image
              src={`/asset/${card.id}.jpg`}
              alt={card.name}
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
              blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02PvDGAAFRAIi4hX/cQAAAABJRU5ErkJggg=='
              placeholder='blur'
            />
          </li>
        </ul>

        {contractWriteLoading ? (
          <div
            className={`mt-6 flex items-center justify-center px-6 py-1 rounded-lg leading-10 text-slate-600 dark:text-slate-100 font-bold text-lg bg-green-400/20 xl:flex
                }`}
          >
            <Loader />
            Crafting Recipe NFT...
          </div>
        ) : (
          <button
            type='button'
            className={`mt-6 flex items-center justify-center px-6 py-1 focus:ring-2 focus:outline-none focus:ring-green-400  rounded-lg leading-10 text-slate-600 dark:text-slate-100 font-bold text-lg bg-green-600 xl:flex hover:bg-green-400/20 w-full ${
              !canCraft && 'cursor-not-allowed opacity-50'
            }`}
            disabled={!canCraft}
            onClick={craft}
          >
            Craft Recipe NFT!
          </button>
        )}
      </div>
    </div>
  );

  return (
    <Layout title={`Crafting ${card.name || ''} - BELLY.`}>
      <Banner />
      <Header />
      <div className='w-full px-10 mx-auto mt-4 max-w-screen-xl dark'>
        <h1 className='mb-3 text-4xl font-bold text-transparent font-header bg-clip-text bg-gradient-to-tl from-red-800 via-yellow-500 to-yellow-300'>
          Craft Recipe NFT
        </h1>
        <p className='text-md text-slate-500'>
          Combine your ingredients and/or recipe NFTs to create a brand new
          recipe NFT.
        </p>
        {renderStatusMessage()}
        {(isCrafting || isCraftingDone) && renderCraftingInProgressContent()}
        {!isCrafting && !isCraftingDone && renderCraftingContent()}
      </div>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      />
    </Layout>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  const { id } = params;
  const result = await fetch(`${process.env.NEXT_URL}/api/cards/${id}`);
  const data = await result.json();

  // redirect to main page if error or NFT is ingredient
  if (!data || data.error || data.type === 'ingredient') {
    return {
      redirect: {
        destination: '/cards',
        permanent: false,
      },
    };
  }

  return {
    props: {
      card: data,
    },
  };
}
