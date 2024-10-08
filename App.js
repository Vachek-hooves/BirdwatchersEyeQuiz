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
import {IconAtlas} from './components/ui/icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        title: '',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: '#000',
          borderRadius: 40,
          height: 90,
          paddingTop: 40,
        },
      }}>
      <Tab.Screen
        name="BirdAtlasScreen"
        component={BirdAtlasScreen}
        options={{tabBarIcon: ({focused}) => <IconAtlas focused={focused} />}}
      />
    </Tab.Navigator>
  );
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
        <Stack.Screen name="TabMenuRender" component={TabMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
