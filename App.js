import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BirdAtlasScreen,
  IntroScreen,
  MapScreen,
  QuizModeScreen,
  QuizPlayScreen,
  QuizScreen,
  UserScreen,
} from './screen';
import {IconAtlas, IconQuiz} from './components/ui/icons';
import {BlurView} from '@react-native-community/blur';
import IconUser from './components/ui/icons/IconUser';
import {COLOR} from './constants/colors';
import {ImagedLayout} from './components/AppLayout';
import IconMap from './components/ui/icons/IconMap';
import {BirdProvider} from './store/bird_context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const withImagedLayout = ScreenComponent => props =>
  (
    <ImagedLayout>
      <ScreenComponent {...props} />
    </ImagedLayout>
  );

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
          borderRadius: 40,
          height: 100,
          paddingTop: 55,
          // backgroundColor: COLOR.lightGreen,
          overflow: 'hidden', // This is important for the BlurView
        },
        tabBarBackground: () => (
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            blurType="dark"
            blurAmount={6}
            reducedTransparencyFallbackColor="light"
          />
        ),
      }}>
      <Tab.Screen
        name="BirdAtlasScreen"
        component={BirdAtlasScreen}
        options={{tabBarIcon: ({focused}) => <IconAtlas focused={focused} />}}
      />
      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{tabBarIcon: ({focused}) => <IconUser focused={focused} />}}
      />
      <Tab.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{tabBarIcon: ({focused}) => <IconQuiz focused={focused} />}}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{tabBarIcon: ({focused}) => <IconMap focused={focused} />}}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <BirdProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
            animationDuration: 800,
          }}>
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="TabMenuRender" component={TabMenu} />
          <Stack.Screen name="QuizModeScreen" component={QuizModeScreen} />
          <Stack.Screen name="QuizPlayScreen" component={QuizPlayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BirdProvider>
  );
}

export default App;
