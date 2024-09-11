import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BirdAtlasScreen,
  IntroScreen,
  MapScreen,
  QuizScreen,
  UserScreen,
} from './screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabMenu = () => {
  return;
  <Tab.Navigator></Tab.Navigator>;
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          animationDuration: 800,
        }}>
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// app updated

export default App;
