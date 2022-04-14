import Loader from './Loader';

interface Props {
  children: string | JSX.Element;
  width?: number;
  loading: boolean;
  [x: string]: any;
}

export default function Button(props: Props) {
  const { children, loading, ...rest } = props;

  return (
    <button
      type='button'
      className={`flex items-center justify-center text-sm px-6 py-1 focus:ring-2 focus:outline-none focus:ring-sky-400 font-medium rounded-full leading-10 text-sky-600 dark:text-sky-400 bg-sky-400/10 xl:flex hover:bg-sky-400/20 ${
        loading && 'cursor-not-allowed opacity-50'
      }`}
      disabled={loading}
      {...rest}
    >
      {loading && <Loader />}
      {children}
    </button>
  );
}
