import '../styles/globals.scss';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Bootstrap এর JS লাইভ সেশন অ্যাক্টিভেট করার জন্য
    import('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
