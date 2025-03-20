import type { AppProps } from 'next/app';
import { Cart } from '../components/Cart';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Cart>
      <Component {...pageProps} />
    </Cart>
  );
} 