// components/GuestRoute.jsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GuestRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/'); // redirect to profile/dashboard if already logged in
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) return null; // prevent flicker

  return children;
}
