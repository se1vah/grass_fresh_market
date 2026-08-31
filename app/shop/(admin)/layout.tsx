import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyShopToken, SHOP_COOKIE_NAME } from '@/lib/auth/shop-jwt';
import ShopAdminLayout from '@/components/shop/layout/ShopAdminLayout';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SHOP_COOKIE_NAME)?.value;

  if (!token) {
    redirect('/shop/login');
  }

  const userPayload = await verifyShopToken(token);

  if (!userPayload) {
    redirect('/shop/login');
  }

  return <ShopAdminLayout user={userPayload}>{children}</ShopAdminLayout>;
}
