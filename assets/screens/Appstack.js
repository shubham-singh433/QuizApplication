import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import MyProfileScreen from './MyProfileScreen';
const Stack = createNativeStackNavigator();
const Appstack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
    </Stack.Navigator>
  );
};
export default Appstack;
