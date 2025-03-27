import '../styles/globals.css';
import '../styles/animations.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { WishlistProvider } from '../context/WishlistContext';
import BlockLoader from '../components/BlockLoader';
import ToastProvider from '../context/ToastContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Handle route change start
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);
  
  return (
    <WishlistProvider>
      <ToastProvider>
        <div className="w-full">
          <Navbar />
          <main className="w-full min-h-screen">
            {loading ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <BlockLoader color="text-[#ce102c]" size="lg" text="Loading toys..." />
              </div>
            ) : (
              <div className="animate-fadeIn">
                <Component {...pageProps} />
              </div>
            )}
          </main>
          <Footer />
          <BackToTop />
        </div>
      </ToastProvider>
    </WishlistProvider>
  );
}

export default MyApp; 