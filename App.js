import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BirdAtlasScreen,
  IntroScreen,
  MapScreen,
  QuizModeScreen,
  QuizPlayScreen,
  QuizQuestion,
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
import {useEffect, useRef, useState} from 'react';
import {Animated,View} from 'react-native';

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

const loader = [
  require('./assets/loder/loader1.png'),
  require('./assets/loder/loader2.png'),
];

function App() {
  const [id, setItem] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeStart();
    const timeOut = setTimeout(() => {
      navigateToMenu();
    }, 6000);
    return () => clearTimeout(timeOut);
  }, []);
  const fadeStart = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => fadeFinish());
  };

  const fadeFinish = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setItem(prevState => prevState + 1);
      fadeStart();
    });
  };
  const navigateToMenu = () => {
    setItem(2);
  };

  return (
    <BirdProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
            animationDuration: 800,
          }}>
          {id < 2 ? (
            <Stack.Screen name="Welcome" options={{headerShown: false}}>
              {() => (
                <View style={{flex: 1}}>
                  <Animated.Image
                    source={loader[id]}
                    style={[
                      {width: '100%', flex: 1},
                      {opacity: animation},
                    ]}></Animated.Image>
                </View>
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen
              name="IntroScreen"
              component={IntroScreen}
            />
          )}
          {/* <Stack.Screen name="IntroScreen" component={IntroScreen} /> */}
          <Stack.Screen name="TabMenuRender" component={TabMenu} />
          <Stack.Screen name="QuizModeScreen" component={QuizModeScreen} />
          <Stack.Screen name="QuizPlayScreen" component={QuizPlayScreen} />
          <Stack.Screen name="QuizQuestion" component={QuizQuestion} />
        </Stack.Navigator>
      </NavigationContainer>
    </BirdProvider>
  );
}

export default App;
