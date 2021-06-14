import AsyncStorage from '@react-native-async-storage/async-storage';
export class Store {
  get = async key => {
    const response = await AsyncStorage.getItem(key);
    return JSON.parse(response);
  };
  set = async (key, value) => {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  };
  remove = async key => {
    return await AsyncStorage.removeItem(key);
  };
  reset = async () => {
    await AsyncStorage.clear();
  };
}
export default new Store();
