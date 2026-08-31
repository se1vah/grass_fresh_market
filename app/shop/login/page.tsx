import { Metadata } from 'next';
import ShopLoginForm from '@/components/shop/ShopLoginForm';

export const metadata: Metadata = {
  title: 'Shop Login - Grace Fresh Market',
  description: 'Sign in to access the Grace Fresh Shop Management Dashboard.',
};

export default function ShopLoginPage() {
  return <ShopLoginForm />;
}
