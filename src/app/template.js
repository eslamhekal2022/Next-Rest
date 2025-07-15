'use client';

import { ToastContainer } from 'react-toastify';
import ClientLayout from './ClientLayout.jsx';
export default function Template({ children }) {
  return (
    <ClientLayout>
      {children}
      <ToastContainer position="top-center" />
    </ClientLayout>
  );
}
