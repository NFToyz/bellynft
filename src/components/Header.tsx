import Link from 'next/link';
import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { useAccount } from 'wagmi';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { HiOutlineLightningBolt } from 'react-icons/hi';

import BellyLogo from '@/components/BellyLogo';
import Button from '@/components/Button';
import WalletOptionsModal from '@/components/WalletOptionsModal';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: accountData, loading: accountLoading }, disconnect] =
    useAccount({
      fetchEns: true,
    });

  const renderConnectButton = () => {
    if (accountData?.ens || accountData?.address) {
      return (
        <Menu
          as='div'
          className='relative inline-block text-left place-items-center'
        >
          <div>
            <Menu.Button className='inline-flex justify-center w-full px-6 pt-1 text-sm font-medium rounded-full focus:ring-2 focus:outline-none focus:ring-sky-400 focus-visible:ring-opacity-75 leading-10 text-sky-600 dark:text-sky-400 bg-sky-400/10 xl:flex hover:bg-sky-400/20'>
              <>
                <span className='inline pt-1 mr-3'>
                  <Jazzicon
                    diameter={18}
                    seed={jsNumberForAddress(accountData?.address)}
                  />
                </span>
                <span className=''>
                  {accountData?.ens?.name
                    ? accountData?.ens?.name
                    : `${accountData?.address.slice(
                        0,
                        6
                      )}...${accountData?.address.slice(
                        accountData?.address.length - 4,
                        accountData?.address.length
                      )}`}
                </span>
              </>
            </Menu.Button>
          </div>

          <Menu.Items className='absolute right-0 z-50 w-48 mt-2 font-medium shadow-lg bg-slate-700 origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-sky-400/10'>
            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href='#'
                    className={classNames(
                      active
                        ? 'bg-sky-500 hover:text-slate-50'
                        : 'text-sky-400',
                      'group flex rounded-md items-center w-full px-4 py-2 text-sm'
                    )}
                    onClick={disconnect}
                  >
                    Disconnect
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      );
    }

    return (
      <Button
        loading={accountLoading}
        onClick={() => setShowWalletOptions(true)}
      >
        Connect Wallet
      </Button>
    );
  };

  return (
    <header className='flex flex-row justify-between px-10 py-6 pb-4'>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />
      <div className='flex flex-row items-center text-base gap-x-9 dark:text-slate-200'>
        <Link href='/' as={`/`} passHref>
          <a
            href='replace'
            className='mr-2 text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'
          >
            <h1>
              <BellyLogo height={28} strokeWidth={0} />
            </h1>
          </a>
        </Link>
        <Link href='/ingredients' as={`/ingredients`} passHref>
          <a
            href=''
            className='text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'
          >
            Ingredients
          </a>
        </Link>
        <Link href='/recipes' as={`/recipes`} passHref>
          <a
            href=''
            className='text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'
          >
            Recipes
          </a>
        </Link>
        <Link href='/about' as={`/about`} passHref>
          <a
            href=''
            className='text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'
          >
            About
          </a>
        </Link>
      </div>
      <div className='flex flex-row items-center text-base gap-x-9 dark:text-slate-200'>
        <Link href='/faucet' as={`/faucet`} passHref>
          <a
            href=''
            className='font-semibold text-emerald-300 hover:text-sky-500 dark:hover:text-sky-400 drop-shadow-[0px_0px_15px_rgba(89,247,105,1)]'
          >
            <HiOutlineLightningBolt className='float-left pt-1 mr-1 text-lg' />
            Faucet
          </a>
        </Link>
        {accountData?.address && (
          <Link href='/pantry' as={`/pantry`} passHref>
            <a
              href=''
              className='text-gray-200 hover:text-sky-500 dark:hover:text-sky-400'
            >
              My Pantry
            </a>
          </Link>
        )}
        {renderConnectButton()}
      </div>
    </header>
  );
}
