import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './Signup';
const Stack = createNativeStackNavigator();
const Authstack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
export default Authstack;
