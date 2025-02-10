interface HeaderLink {
  icon: string;
  label: string;
  to: string;
  onlyIcon?: boolean;
}

const HOME_LINK: HeaderLink = {
  icon: 'home',
  label: 'Home',
  to: '/',
};

const NEW_POST_LINK: HeaderLink = {
  icon: 'edit',
  label: 'New Post',
  to: '/editor',
};

const SETTINGS_LINK: HeaderLink = {
  icon: 'settings',
  label: 'Settings',
  to: '/settings',
};

const PROFILE_LINK: HeaderLink = {
  icon: 'person',
  label: 'Profile',
  to: '/profile',
};

const LOGIN_LINK: HeaderLink = {
  icon: 'login',
  label: 'Sign in',
  to: '/login',
};

const REGISTER_LINK: HeaderLink = {
  icon: 'person_add',
  label: 'Sign up',
  to: '/register',
};

export const GUEST_LINKS: HeaderLink[] = [LOGIN_LINK, REGISTER_LINK];
export const USER_LINKS: HeaderLink[] = [HOME_LINK, NEW_POST_LINK];
export const USER_MENU_LINKS: HeaderLink[] = [PROFILE_LINK, SETTINGS_LINK];

export const MOBILE_GUEST_LINKS: HeaderLink[] = [LOGIN_LINK];
export const MOBILE_USER_LINKS: HeaderLink[] = [
  {
    ...NEW_POST_LINK,
    onlyIcon: true,
  },
];
export const MOBILE_USER_MENU_LINKS: HeaderLink[] = [
  PROFILE_LINK,
  SETTINGS_LINK,
];

export const getHeaderLinks = (
  isLoggedIn: boolean,
  isMobile: boolean
): HeaderLink[] => {
  if (isLoggedIn) {
    return isMobile ? MOBILE_USER_LINKS : USER_LINKS;
  }

  return isMobile ? MOBILE_GUEST_LINKS : GUEST_LINKS;
};

export const getHeaderMenuLinks = (isMobile: boolean): HeaderLink[] => {
  return isMobile ? MOBILE_USER_MENU_LINKS : USER_MENU_LINKS;
};
