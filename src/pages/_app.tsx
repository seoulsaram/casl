import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { defaultACLObj } from '../configs/acl';
import { NextPage } from 'next';
import AclGuard from '../auth/AclGuard';
import GuestGuard from '../auth/GuestGuard';
import { ReactNode, useEffect, useState } from 'react';
import AuthGuard from '../auth/AuthGuard';
import UserLayout from '../layouts/UserLayout';
import { AuthProvider } from '../context/AuthContext';

type ExtendedAppProps = AppProps & {
  Component: NextPage;
};

type GuardProps = {
  guestGuard: boolean;
  children: ReactNode;
};

export default function App(props: ExtendedAppProps) {
  const { Component, pageProps } = props;
  const [data, setData] = useState('');

  const guestGuard = Component.guestGuard ?? false;

  const aclAbilities = Component.acl ?? defaultACLObj;

  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  /* guestGuard는  */
  const Guard = ({ children, guestGuard }: GuardProps) => {
    if (guestGuard) {
      return <GuestGuard>{children}</GuestGuard>;
    } else {
      return <AuthGuard>{children}</AuthGuard>;
    }
  };

  async function logJSONData() {
    const response = await fetch(
      'http://ec2-54-180-122-207.ap-northeast-2.compute.amazonaws.com:8080/hello'
    );
    try {
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData.smsg);
    } catch (e) {
      return '';
    }
  }

  useEffect(() => {
    logJSONData();
  }, []);

  return (
    <AuthProvider>
      <Guard guestGuard={guestGuard}>
        <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
          <h1>{data ?? ''}</h1>
          {getLayout(<Component {...pageProps} />)}
        </AclGuard>
      </Guard>
    </AuthProvider>
  );
}
