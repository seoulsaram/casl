import { ReactNode } from 'react';
import { NavGroup, VerticalNavItemsType } from './types';
import CanViewNavGroup from '../components/acl/CanViewNavGroup';

interface Props {
  children: ReactNode;
}

// const navigation: VerticalNavItemsType = [
//   {
//     title: 'Admin home',
//     action: 'read',
//     subject: 'admin',
//     path: `/dashboards`,
//   },
// ];
const navigation: VerticalNavItemsType = [
  {
    title: 'Admin menu',
    action: 'read',
    subject: 'admin',
    children: [
      {
        title: 'Admin test',
        path: `/test`,
        action: 'read',
        subject: 'admin',
      },
    ],
  },
];

const UserLayout = ({ children }: Props) => {
  return (
    <section style={{ display: 'flex' }} className='nav-items'>
      <nav style={{ width: '30%', padding: '6rem' }}>
        {navigation.map((i) => (
          <CanViewNavGroup navGroup={i} key={i.title}>
            <p>{i.title}</p>
          </CanViewNavGroup>
        ))}
      </nav>
      <section style={{ width: '100%', padding: '6rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{children}</section>
    </section>
  );
};

export default UserLayout;
