import { ReactNode, useContext } from 'react';

import { AbilityContext } from './Can';
import { NavGroup, NavLink } from '@/layouts/types';

interface Props {
  navGroup?: NavGroup;
  children: ReactNode;
}

const CanViewNavGroup = (props: Props) => {
  // ** Props
  const { children, navGroup } = props;

  // ** Hook
  const ability = useContext(AbilityContext);

  const checkForVisibleChild = (arr: NavLink[] | NavGroup[]): boolean => {
    return arr.some((i: NavGroup) => {
      if (i.children) {
        return checkForVisibleChild(i.children);
      } else {
        return ability?.can(i.action, i.subject);
      }
    });
  };

  const canViewMenuGroup = (item: NavGroup) => {
    const hasAnyVisibleChild = item.children && checkForVisibleChild(item.children);
    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild;
    }
    console.log('hasAnyVisibleChild', hasAnyVisibleChild);
    return hasAnyVisibleChild;
    // return (
    //   ability && ability.can(item.action, item.subject) && hasAnyVisibleChild
    // )
  };

  return navGroup && canViewMenuGroup(navGroup) ? <>{children}</> : null;
};

export default CanViewNavGroup;
