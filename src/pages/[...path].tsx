import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  };
};

export const getStaticProps = async () => {
  return {
    notFound: true
  };
};

const CatchAll = () => {
  const router = useRouter();
  const path = router.asPath;

  useEffect(() => {
    if (!path.endsWith('=404notfound')) {
      router.replace(`${path}=404notfound`);
    }
  }, [path, router]);

  return null;
};

export default CatchAll; 