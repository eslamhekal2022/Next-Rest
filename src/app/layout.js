import ClientLayout from "./ClientLayout.jsx";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ClientLayout>
                {children}
            </ClientLayout>
      </body>
    </html>
  );
}
