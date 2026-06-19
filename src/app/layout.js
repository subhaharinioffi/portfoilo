import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://subhaharinioffi.github.io/portfoilo/"),
  title: "Subhaharini | Full Stack Java & Web Developer",
  description: "Official portfolio of Subhaharini — Full Stack Developer specializing in Java, Next.js, and creative user interface design. Hackathon winner and builder of high-performance real-world software solutions.",
  keywords: ["Subhaharini", "Full Stack Developer", "Java Developer", "Web Developer", "Rathinam College", "Zentix", "SkipQ", "Coimbatore", "Software Engineer", "Java Foundations Certified"],
  authors: [{ name: "Subhaharini", url: "https://www.linkedin.com/in/subha-hariniofficial" }],
  alternates: {
    canonical: "https://subhaharinioffi.github.io/portfoilo/",
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
  openGraph: {
    title: "Subhaharini | Full Stack Developer",
    description: "Discover Zentix, SkipQ, and other scalable software solutions architected by Subhaharini. Pursuing B.Sc. Computer Technology with a focus on Java, Next.js, and spatial UI/UX.",
    url: "https://subhaharinioffi.github.io/portfoilo/",
    siteName: "Subhaharini Portfolio",
    images: [
      {
        url: "/photo.jpg",
        width: 800,
        height: 600,
        alt: "Subhaharini — Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhaharini | Full Stack Developer",
    description: "Full stack Java & Web development portfolio of Subhaharini. Winner of TN-IMPACT state hackathon.",
    images: ["/photo.jpg"],
  },
};

export const viewport = {
  themeColor: "#fbfaf5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://subhaharinioffi.github.io/portfoilo/#person",
      "name": "Subhaharini",
      "jobTitle": "Full Stack Developer & Java Engineer",
      "url": "https://subhaharinioffi.github.io/portfoilo/",
      "sameAs": [
        "https://www.linkedin.com/in/subha-hariniofficial",
        "https://github.com/subhaharinioffi"
      ],
      "knowsAbout": [
        "Java", "JavaScript", "HTML", "CSS", "Next.js", "PostgreSQL", "Bun.js", "DaVinci Resolve", "Git", "GitHub", "System Design", "UI/UX Design", "Data Structures and Algorithms"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Rathinam Group of Institutions",
        "sameAs": "https://www.rathinamcollege.edu.in/"
      },
      "award": [
        "TN-IMPACT 2026 Special Prize Winner",
        "AlgoRhythm '26 Winner",
        "Best Manager Winner (Hindustan College)",
        "Viral Visionary Award (Queenathon)"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://subhaharinioffi.github.io/portfoilo/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What technical stacks and programming languages does Subhaharini use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Subhaharini is highly skilled in Core Java (Oracle Certified Associate) and web development technologies. Her stack includes Java, C, HTML/CSS, JavaScript, Next.js, PostgreSQL, Bun.js, and Elysia.js."
          }
        },
        {
          "@type": "Question",
          "name": "What are some of Subhaharini's award-winning projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Subhaharini has architected Zentix, a real-time smart campus navigation and resource tracking system, and SkipQ, a scalable queue management system that optimized wait times by 35%."
          }
        },
        {
          "@type": "Question",
          "name": "Has Subhaharini won any hackathons or competitions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, she is a state-level hackathon competitor. Her awards include the Special Prize at the TN-IMPACT 2026 Industrial Hackathon, 1st place in AlgoRhythm '26, and Best Manager at Hindustan College."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
