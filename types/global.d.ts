type TAppState = {
  preferredTheme: 'light' | 'dark';
  showNotifications: boolean;
};

type LoggedInUser = {
  fullName: string;
  phoneNumber: string;
  profilePhoto: string;
  gender: string;
  email: string;
  walletId: string;
};

type AuthToken = {
  id: string;
  tokenExpiry: number;
};

type TAuthState = {
  user: null | LoggedInUser;
  auth: null | AuthToken;
  firstTimer: boolean;
};

type CalendarDayType = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

type slotDataProp = {
  id: number;
  isBooked: boolean;
  startTime: string;
  endTime: string;
};

type ComposeBookingDetailType = {
  walletId: string;
  chosenService: string;
  price: number;
  date: string;
  startTime: string;
  endTime: string;
  email: string;
  fullName: string;
  gender: string;
};

type BookedAppointmentCardData = {
  email?: string;
  gender?: string;
  fullName?: string;
  chosenService: string;
  price: number;
  date: string;
  startTime: string;
  endTime: string;
  _id: string;
};
