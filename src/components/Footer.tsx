import Link from 'next/link';
import { FaTwitter } from 'react-icons/fa';

import LogoNftoyz from '@/components/LogoNftoyz';
import LogoOs from '@/components/LogoOs';

const FooterComponent = () => {
  const isMainnet = !!+(process.env.NEXT_PUBLIC_CHAIN_IS_MAINNET || '0');
  const nftContractAddress = process.env.NEXT_PUBLIC_BELLY_NFT || '';

  return (
    <footer className='px-10 clear-both'>
      <div className='flex flex-col items-center py-12 text-base sm:flex-row'>
        <Link href='/' as={`/`} passHref>
          <a
            href='replace'
            className='flex items-center justify-center title-font md:justify-start'
          >
            <span className='text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'>
              belly.io
            </span>
          </a>
        </Link>
        <a
          href='https://twitter.com/nftoyz'
          target='_blank'
          rel='noreferrer'
          className='px-2 ml-3 text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'
        >
          <FaTwitter />
        </a>
        <a
          href={`https://${
            !isMainnet ? 'testnets.' : ''
          }opensea.io/collection/bellynft`}
          target='_blank'
          rel='noreferrer'
          className='px-2 text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'
        >
          <LogoOs height={26} />
        </a>
        <span className='inline-flex justify-center mt-4 text-sm font-base leading-8 sm:ml-auto sm:mt-0 sm:justify-start ln'>
          <a
            href={`https://${
              !isMainnet ? 'mumbai.' : ''
            }polygonscan.com/address/${nftContractAddress}`}
            target='_blank'
            rel='noreferrer'
            className='px-2 text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'
          >
            Contract:{' '}
            {`${nftContractAddress.slice(0, 6)}...${nftContractAddress.slice(
              nftContractAddress.length - 4,
              nftContractAddress.length
            )}`}
          </a>
          <Link href='/about' as={`/about`} passHref>
            <a
              href='replace'
              className='px-5 pr-8 text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'
            >
              About
            </a>
          </Link>
          <a
            href='https://nftoyz.com'
            className='drop-shadow-[0px_0px_15px_rgba(255,0,0,0.8)]'
          >
            <LogoNftoyz height={30} />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default FooterComponent;
