import Colors from '@/constants/Colors';
import Toast from 'react-native-root-toast';

// Add a Toast on screen.

const useToast = (
  message: string,
  bgColor = Colors.dark.primaryOrange,
  textColor = Colors.dark.white
) =>
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: bgColor,
    textColor: textColor,
    opacity: 0.9,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });

export default useToast;

/**
 * 
 npm install react-native-root-toast

 import { RootSiblingParent } from 'react-native-root-siblings';

// in your render function 
return (
  <RootSiblingParent>  // <- use RootSiblingParent to wrap your root component
    <App />
  </RootSiblingParent>
);
     


 */
