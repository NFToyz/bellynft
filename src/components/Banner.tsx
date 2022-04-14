export default function Banner() {
  return (
    <a
      className='block p-3 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 group'
      href='https://nft.replit.com/'
      target='_blank'
      rel='noreferrer'
    >
      <span className='flex items-center justify-center text-sm font-medium text-white transition group-hover:text-opacity-75'>
        #HelloNFTWorld Hackathon Project
      </span>
    </a>
  );
}
