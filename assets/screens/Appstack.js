import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import MyProfileScreen from './MyProfileScreen';
import Quiz from './Quiz';
import checkSheet from './checkSheet';
const Stack = createNativeStackNavigator();
const Appstack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="checkSheet" component={checkSheet} />
    </Stack.Navigator>
  );
};
export default Appstack;
