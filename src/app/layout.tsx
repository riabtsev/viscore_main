import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://visualcore.ru"),
  title: {
    default: "VisualCore",
    template: "%s · VisualCore",
  },
  description:
    "VisualCore — образовательная платформа по дизайну для подростков. Игровые модули, XP, бейджи и портфолио с первого дня.",
  applicationName: "VisualCore",
  keywords: [
    "VisualCore",
    "дизайн для подростков",
    "обучение дизайну",
    "геймификация",
    "типографика",
    "композиция",
    "портфолио дизайнера",
  ],
  authors: [{ name: "VisualCore" }],
  creator: "VisualCore",
  publisher: "VisualCore",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "VisualCore — дизайн-образование для подростков",
    description:
      "Игровые модули по композиции, типографике и интерфейсам. Собирай портфолио и качай навыки в своём темпе.",
    siteName: "VisualCore",
    images: [
      {
        url: "/pedagog.png",
        width: 1200,
        height: 630,
        alt: "VisualCore — платформа про дизайн",
      },
    ],
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "VisualCore — дизайн-образование для подростков",
    description:
      "Модули, практика и портфолио: учимся дизайну через игровой формат.",
    images: ["/pedagog.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  category: "Education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          href="/@fonts/Satoshi-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/@fonts/Satoshi-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/@fonts/Satoshi-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/@fonts/Satoshi-Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "VisualCore",
              url: "https://visualcore.ru",
              logo: "https://visualcore.ru/pedagog.png",
              description:
                "Онлайн-платформа по обучению дизайну для подростков с геймификацией и практическими модулями.",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
