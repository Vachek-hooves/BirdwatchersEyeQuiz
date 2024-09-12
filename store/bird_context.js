import {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BirdContext = createContext({
  customBirds: [],
  addCustomBird: () => {},
  deleteCustomBird: () => {},
});

export const BirdProvider = ({children}) => {
  const [customBirds, setCustomBirds] = useState([]);
  useEffect(() => {
    loadCustomBirds();
  }, []);

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

  const value = {
    customBirds,
    addCustomBird,
    deleteCustomBird,
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
