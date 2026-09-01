import React from 'react';
import AppSettingsForm from '@/components/shop/app-setting/AppSettingsForm';

export const metadata = {
  title: 'App Setting - Grace Fresh Market',
  description: 'Manage email and phone number for the application',
};

export default function AppSettingPage() {
  return <AppSettingsForm />;
}
