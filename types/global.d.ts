type TAppState = {
  preferredTheme: 'light' | 'dark';
  showNotifications: boolean;
};

type TAuthState = {
  user: null | any;
  firstTimer: boolean;
};
