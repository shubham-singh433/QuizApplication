import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './Signup';
import Registration from './Registration';
const Stack = createNativeStackNavigator();
const Authstack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Registration" component={Registration} />
    </Stack.Navigator>
  );
};
export default Authstack;
