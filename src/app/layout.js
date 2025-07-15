import ClientLayout from "./ClientLayout.jsx";
import { ToastContainer } from 'react-toastify';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
                {children}
      </body>
    </html>
  );
}
