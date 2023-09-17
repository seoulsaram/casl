// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react';

// ** Next Import
import { useRouter } from 'next/router';
import { PermissionObjectType } from '../configs/acl';

// ** Defaults
const defaultProvider = {
  user: 'guest' as UserType,
  login: (user: UserType) => {},
  logout: () => {},
  permission: [{ subject: 'home', can: 'read' }] as PermissionObjectType,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

type UserType = 'guest' | 'admin';
const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserType>('guest');
  const [permission, setPermission] = useState<PermissionObjectType>([{ subject: 'home', can: 'read' }]);

  // ** Hooks
  const router = useRouter();

  const login = (user: UserType) => {
    setUser(user);
    if (user === 'admin') {
      setPermission([
        { subject: 'home', can: 'read' },
        { subject: 'admin', can: 'create' },
        { subject: 'admin', can: 'read' },
        { subject: 'admin', can: 'update' },
        { subject: 'admin', can: 'delete' },
      ]);
    }
  };

  const logout = () => {
    setUser('guest');
    router.push('/');
    setPermission([{ subject: 'home', can: 'read' }]);
  };

  const values = {
    user,
    login,
    logout,
    permission,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
