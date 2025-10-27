import "./globals.css";
import Script from "next/script";
import { Providers } from "./components/Providers";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')),
  title: "Directory Hunt - Launchpad for Directories and Tiny Projects",
  description: "Submit your directory or tiny project to our launchpad and get discovered. Join the community of successful builders and innovators.",
  keywords: ["directory", "tiny projects", "launchpad", "backlinks", "SEO", "project launch", "product hunt for directories", "project directory", "startup launch"],
  authors: [{ name: "Directory Hunt" }],
  creator: "Directory Hunt",
  publisher: "Directory Hunt",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "https://directoryhunt.org",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://directoryhunt.org",
    title: "Directory Hunt - Launchpad for Directories and Tiny Projects",
    description: "Submit your directory or tiny project to our launchpad and get discovered.",
    siteName: "Directory Hunt",
    images: [
      {
        url: "/assets/OG_img.png",
        width: 1200,
        height: 630,
        alt: "Directory Hunt - Launchpad for Directories and Tiny Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Directory Hunt - Launchpad for Directories and Tiny Projects",
    description: "Submit your directory or tiny project to our launchpad and get discovered.",
    images: ["/assets/OG_img.png"],
    creator: "@directoryhunt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://directoryhunt.org";
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Directory Hunt",
    "description": "Launchpad for Directories and Tiny Projects",
    "url": baseUrl,
    "logo": `${baseUrl}/assets/logo.svg`,
    "sameAs": [
      "https://x.com/directoryhunt"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${baseUrl}/contact`
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Directory Hunt",
    "description": "Submit your directory or tiny project to our launchpad and get discovered. Join the community of successful builders and innovators.",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/projects?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" data-theme="light" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=TikTok+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning={true}>
        <Providers>
          <div className="min-h-screen bg-base-100 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="302768bfc01e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
