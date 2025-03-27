import { NextSeoProps } from 'next-seo';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    type: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
}

export function useSEO(props: SEOProps): NextSeoProps {
  const {
    title,
    description,
    canonical,
    openGraph,
  } = props;

  return {
    title,
    description,
    canonical,
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: openGraph?.url || canonical || '',
      type: openGraph?.type || 'website',
      images: openGraph?.images || [],
    },
    twitter: {
      handle: '@toystore',
      site: '@toystore',
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
    ],
  };
} 