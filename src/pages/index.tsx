import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import { ADMIN, GUEST } from '@/constants/pathNames';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import BlankLayout from '../layouts/BlankLayout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>CASL demo</title>
        <meta name='description' content='CASL을 이용하여 프론트에서 접근제어 관리하기 데모입니다.' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>CASL demo</h1>

        <button
          onClick={() => {
            login('admin');
            router.push(ADMIN.HOME);
          }}
        >
          Admin login
        </button>
        <button
          onClick={() => {
            login('guest');
            router.push(GUEST.HOME);
          }}
        >
          Enter as Guest
        </button>
      </main>
    </>
  );
}

Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

Home.guestGuard = true;
