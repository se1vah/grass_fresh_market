import { Metadata } from 'next';
import DashboardStats from '@/components/shop/dashboard/DashboardStats';

export const metadata: Metadata = {
  title: 'Dashboard - Shop Admin | Grace Fresh Market',
  description: 'Grace Fresh Market Shop Admin Dashboard overview and catalog statistics.',
};

export default function ShopAdminDashboardPage() {
  return <DashboardStats />;
}
