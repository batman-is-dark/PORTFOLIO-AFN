import '../styles/globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkipLink from '../components/SkipLink';
import { SeoJsonLd } from '../components/SeoJsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'AI/Data Science Portfolio – MBZUAI Applicant',
  description: 'Projects, skills, and writing by an aspiring AI/Data Science undergraduate.',
  openGraph: {
    title: 'AI/Data Science Portfolio – MBZUAI Applicant',
    description: 'Projects, skills, and writing by an aspiring AI/Data Science undergraduate.',
    images: [
      {
        url: '/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'AI/Data Science Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
  // verification: {
  //   google: 'your-google-site-verification-code',
  //   other: {
  //     'msvalidate.01': 'your-bing-verification-code',
  //   },
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initScript = `
  (function(){
    try{
      var d=document.documentElement;
      var t=localStorage.getItem('theme');
      if(t==='light'||t==='dark'){ d.dataset.theme=t; }
      var v=localStorage.getItem('viewerMode');
      if(v==='reel'||v==='three'){ d.dataset.viewer=v; }
    }catch(e){}
  })();`;

  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} dark`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <SeoJsonLd />
      </head>
      <body className="font-sans bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}