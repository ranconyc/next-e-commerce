import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../utils/store';

export default function ShippingPage() {
  const router = useRouter();
  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store);
  if (!userInfo) {
    router.push('/login?redirect=/shipping');
  }
  return <div>Shipping </div>;
}
