import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tontine',
  description: 'Gestion numérique des tontines et cotisations.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
