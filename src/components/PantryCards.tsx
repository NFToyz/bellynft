import useSWR from 'swr';
import { useAccount } from 'wagmi';
import Link from 'next/link';

import CardList from '@/components/CardList';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

export default function PantryCards() {
  const [{ data: accountData }] = useAccount();

  const { data, error } = useSWR(
    accountData?.address ? `/api/pantry/${accountData?.address}` : null,
    fetcher
  );

  if (!accountData?.address) {
    return (
      <div className='p-4 py-3 my-4 bg-red-600 rounded-lg text-md text-slate-200'>
        Please connect your wallet first.
      </div>
    );
  }

  if (error)
    return (
      <div className='p-4 py-3 my-4 bg-red-600 rounded-lg text-md text-slate-200'>
        Failed to load
      </div>
    );

  if (!data)
    return (
      <div className='p-4 py-3 my-4 bg-green-600 rounded-lg text-md text-slate-200'>
        Loading NFTs from your wallet...
      </div>
    );

  return (
    <div>
      {data.length > 0 ? (
        <CardList cards={data} />
      ) : (
        <div className='m-10 text-xl text-center text-slate-400'>
          No Belly NFTs are found in your wallet. You can mint some for free on
          the{' '}
          <Link href={`/faucet`} as={`/faucet`} passHref>
            <a href='' className='font-bold'>
              Faucet Page
            </a>
          </Link>
          .
        </div>
      )}
    </div>
  );
}
