import React from 'react';
import { useRouter } from 'next/router';

export default function ShippingPage() {
  const router = useRouter();
  router.push('/login');
  return <div></div>;
}
