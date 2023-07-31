import { ReactNode } from 'react';

const BlankLayout = ({ children }: { children: ReactNode }) => {
  return <section style={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>{children}</section>;
};

export default BlankLayout;
