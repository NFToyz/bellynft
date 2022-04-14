import { useState, useRef, useCallback } from 'react';
import { useAccount, useContractWrite, useNetwork } from 'wagmi';
import Link from 'next/link';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { CreateTypes } from 'canvas-confetti';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import Loader from '@/components/Loader';

import bellyFaucetAbi from '@/abi/BellyFaucet.json';

export default function Faucet() {
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
    gimmeIngredients,
  ] = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_BELLY_FAUCET || '',
      contractInterface: bellyFaucetAbi.abi,
    },
    'gimmeIngredients',
    {
      args: [accountData?.address],
    }
  );

  const isWalletConnected = accountData && accountData?.address;

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

  const [isMinting, setIsMinting] = useState(false);
  const [isMintingDone, SetIsMintingDone] = useState(false);
  const mintIngredients = async () => {
    const tx = await gimmeIngredients();
    setIsMinting(true);
    const result = await tx.data?.wait();

    // tx done from blockchain
    setIsMinting(false);

    if (typeof result !== 'undefined') {
      SetIsMintingDone(true);
      fireConfetti();
    }
  };

  const renderStatusMessage = () => {
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

    if (contractWriteError) {
      return (
        <div className='p-4 py-3 my-4 bg-red-600 rounded-lg text-md text-slate-200'>
          {contractWriteError.message}
        </div>
      );
    }
  };

  const canMint = Boolean(isWalletConnected && !networkData.chain?.unsupported);

  const renderMintingInProgressContent = () => (
    <div className='p-6 my-6 rounded-lg lg:col-span-2 bg-slate-500/20'>
      <h2 className='mt-3 mb-6 text-3xl leading-snug text-slate-200'>
        {!isMintingDone
          ? 'Minting NFTs in progress...'
          : 'Ingredient NFTs have been minted to your wallet!'}
      </h2>
      {!isMintingDone && contractWriteData && (
        <>
          <p className='mb-6 text-slate-300 text-md'>
            Transaction has been submitted to the blockchain.
          </p>
          <p className='mb-6 text-slate-300 text-md'>
            <a
              target='_blank'
              rel='noreferrer'
              href={`https://${!isMainnet ? 'mumbai.' : ''}polygonscan.com/tx/${
                contractWriteData.hash
              }`}
              className='font-bold text-sky-500'
            >
              Click here to see more information
            </a>{' '}
            about your transaction.
          </p>
        </>
      )}
      {isMintingDone && (
        <>
          <p className='mb-6 text-slate-300 text-md'>
            Your new ingredient NFTs should now be in{' '}
            <Link href={`/pantry`} as={`/pantry`} passHref>
              <a href='' className='font-bold text-sky-500'>
                My Pantry.
              </a>
            </Link>
          </p>
        </>
      )}
    </div>
  );

  const renderMintingContent = () => (
    <div className='mt-8 mb-16'>
      <div>
        {contractWriteLoading ? (
          <div
            className={`mt-6 flex items-center justify-center px-6 py-1 rounded-lg leading-10 text-slate-600 dark:text-slate-100 font-bold text-lg bg-green-400/20 xl:flex
                }`}
          >
            <Loader />
            Minting NFTs...
          </div>
        ) : (
          <button
            type='button'
            className={`mt-6 flex items-center justify-center px-6 py-1 focus:ring-2 focus:outline-none focus:ring-green-400  rounded-lg leading-10 text-slate-600 dark:text-slate-100 font-bold text-lg bg-green-600 xl:flex hover:bg-green-400/20 w-full ${
              !canMint && 'cursor-not-allowed opacity-50'
            }`}
            disabled={!canMint}
            onClick={mintIngredients}
          >
            Mint Ingredients!
          </button>
        )}
      </div>
    </div>
  );

  return (
    <Layout title={`Ingredient Faucet - BELLY.`}>
      <Banner />
      <Header />
      <div className='w-full px-10 mx-auto mt-4 leading-relaxed max-w-screen-lg dark'>
        <h1 className='mb-6 text-4xl font-bold text-transparent font-header bg-clip-text bg-gradient-to-r from-emerald-300 to-lime-500'>
          Ingredient Faucet
        </h1>
        <p className='leading-relaxed text-md text-slate-400'>
          Coming from the{' '}
          <a href='https://nft.replit.com/' target='_blank' rel='noreferrer'>
            #HelloNFTWorld Hackathon
          </a>{' '}
          and want to try out the Crafting functionality? Use our faucet to get
          one of each ingredient, for free!
        </p>
        <ol className='my-4 ml-4 list-decimal list-inside'>
          <li className='mb-6'>
            If you don&apos;t have it already,{' '}
            <a
              href='https://docs.polygon.technology/docs/develop/metamask/hello/'
              target='_blank'
              rel='noreferrer'
            >
              install Metamask
            </a>{' '}
            (
            <a
              href='https://geekflare.com/finance/beginners-guide-to-metamask/'
              target='_blank'
              rel='noreferrer'
            >
              here&apos;s another good in-depth tutorial
            </a>{' '}
            if you&apos;re not already familiar with Metamask!)
          </li>
          <li className='mb-6'>
            Use one of these faucets to get testnet MATIC for free to use on the
            Polygon Mumbai testnet:
            <ul className='mt-2 ml-4 leading-loose list-disc list-inside'>
              <li>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://faucet.polygon.technology/'
                >
                  Polygon Testnet Faucet
                </a>
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://faucets.chain.link/mumbai'
                >
                  Faucet provided by Chainlink
                </a>
              </li>
              <li>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://faucet.paradigm.xyz/'
                >
                  Paradigm
                </a>
              </li>
            </ul>
          </li>
          <li className='mb-6'>
            Click the{' '}
            <strong className='font-bold text-green-400'>
              &quot;Mint Ingredients!&quot;
            </strong>{' '}
            button below to mint a set of ingredients on the Polygon Mumbai
            testnet. Feel free to mint multiple sets if you need more
            ingredients!
          </li>
          <li className='mb-6'>
            See all your new NFTs on the{' '}
            <Link href={`/pantry`} as={`/pantry`} passHref>
              <a href=''>My Pantry</a>
            </Link>{' '}
            page, and check out the{' '}
            <Link href={`/recipes`} as={`/recipes`} passHref>
              <a href=''>Recipes page</a>
            </Link>{' '}
            to see what recipe NFTs you can craft with your ingredients!
          </li>
        </ol>

        {renderStatusMessage()}
        {(isMinting || isMintingDone) && renderMintingInProgressContent()}
        {!isMinting && !isMintingDone && renderMintingContent()}
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
