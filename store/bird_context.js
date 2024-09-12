import {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {easyLevel, hardLevel} from '../data/quiz_data';

export const BirdContext = createContext({
  customBirds: [],
  easy: [],
  hard: [],
  addCustomBird: () => {},
  deleteCustomBird: () => {},
  chooseQuizMode: () => {},
});

export const BirdProvider = ({children}) => {
  const [customBirds, setCustomBirds] = useState([]);
  const [easy, setEasy] = useState([]);
  const [hard, setHard] = useState([]);

  useEffect(() => {
    loadCustomBirds();
    loadQuizData();
  }, []);

  const loadQuizData = async () => {
    try {
      // Load easy level data
      const storedEasyData = await AsyncStorage.getItem('easyLevel');
      if (storedEasyData) {
        setEasy(JSON.parse(storedEasyData));
      } else {
        // If not in AsyncStorage, use the imported data and save it
        await AsyncStorage.setItem('easyLevel', JSON.stringify(easyLevel));
        setEasy(easyLevel);
      }

      // Load hard level data
      const storedHardData = await AsyncStorage.getItem('hardLevel');
      if (storedHardData) {
        setHard(JSON.parse(storedHardData));
      } else {
        // If not in AsyncStorage, use the imported data and save it
        await AsyncStorage.setItem('hardLevel', JSON.stringify(hardLevel));
        setHard(hardLevel);
      }
    } catch (error) {
      console.error('Error loading quiz data:', error);
    }
  };

  const loadCustomBirds = async () => {
    try {
      const storedBirds = await AsyncStorage.getItem('customBirds');
      if (storedBirds) {
        setCustomBirds(JSON.parse(storedBirds));
      }
    } catch (error) {
      console.error('Error loading custom birds:', error);
    }
  };

  const addCustomBird = async newBird => {
    try {
      const updatedBirds = [newBird, ...customBirds];
      setCustomBirds(updatedBirds);
      await AsyncStorage.setItem('customBirds', JSON.stringify(updatedBirds));
    } catch (error) {
      console.error('Error saving custom bird:', error);
    }
  };

  const deleteCustomBird = async id => {
    try {
      const updatedBirds = customBirds.filter(bird => bird.id !== id);
      setCustomBirds(updatedBirds);
      await AsyncStorage.setItem('customBirds', JSON.stringify(updatedBirds));
    } catch (error) {
      console.error('Error deleting custom bird:', error);
    }
  };

  const chooseQuizMode = mode => {
    switch (mode) {
      case 'easy':
        return easy;
      case 'hard':
        return hard;
      default:
        return [];
    }
  };
  const value = {
    easy,
    hard,
    customBirds,
    addCustomBird,
    deleteCustomBird,
    chooseQuizMode,
  };
  return <BirdContext.Provider value={value}>{children}</BirdContext.Provider>;
};

export const useBirdContext = () => {
  const context = useContext(BirdContext);
  if (!context) {
    console.error('Context error');
  }
  return context;
};
