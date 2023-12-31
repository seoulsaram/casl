// ** React Imports
import { ReactNode, useContext, useEffect, useState } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Contexts
import { AbilityContext } from '../components/acl/Can';

// ** Configs
import { ACLObj, AppAbility, buildAbilityFor } from '../configs/acl';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';

interface AclGuardProps {
  children: ReactNode;
  guestGuard: boolean;
  aclAbilities: ACLObj;
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard } = props;

  const [ability, setAbility] = useState<AppAbility | undefined>(undefined);

  const { permission } = useContext(AuthContext);

  // ** Hooks
  const router = useRouter();

  // User is logged in, build ability for the user based on his role
  useEffect(() => {
    setAbility(buildAbilityFor(permission));
  }, [permission]);

  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <>{children}</>;
  }

  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
  }

  return <GuardPageContainer>{!permission.length || !ability ? <h2>loading...</h2> : <h2>You are not authorized!</h2>}</GuardPageContainer>;
};

export default AclGuard;

const GuardPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
