import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '@/constants/API';
import { View } from 'react-native';
import { logOut, refreshTokenSuccess } from './redux/authSlice';
import useToast from '@/components/Toasts';

type RefreshProviderProp = {
  children: React.ReactNode;
};

const RefreshTokenProvider = ({
  children,
}: RefreshProviderProp): JSX.Element => {
  // Retrieve the authentication value from redux state.

  // @ts-ignore
  const authState = useSelector((state) => state.auth as TAuthState);
  const { auth } = authState;

  //   Instantiate dispatch
  const dispatch = useDispatch();

  // UseEffect to set up the Time interval
  useEffect(() => {
    //  Define function to refresh the token
    const refreshToken = async () => {
      if (auth) {
        try {
          const response = await API.get('api/auth/refresh-token', {
            headers: { Authorization: `Basic ${auth?.id}` },
          });
          const { auth: newAuth, tokenExpiry } = response.data;
          dispatch(refreshTokenSuccess({ id: newAuth, tokenExpiry }));

          // Dispatch Refresh token to update the global state.
        } catch (error) {
          console.log(error);
          dispatch(logOut());
          useToast('Session has expired. Please log out and log in again.');
        }
      }
    };

    // Create Interval to call the function every
    // 18 minutes to update the token for the
    // currently Logged In user
    if (auth) {
      const intervalId = setInterval(refreshToken, 15 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [auth]);

  //   Return the children
  return <>{children}</>;
};

export default RefreshTokenProvider;
