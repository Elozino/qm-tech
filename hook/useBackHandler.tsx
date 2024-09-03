import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

const useBackHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return
    });

    return () => navigation.removeListener('beforeRemove', () => null)
  }, []);
};

export default useBackHandler;
