import {AsyncStorage} from 'react-native'



export default class LocalStorage {


    static async saveObject(key, data) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data))
        } catch (error) {
          console.log(error.message)
        }
    }

    static async retrieveObject(key) {
        try {
            retrievedItem = await AsyncStorage.getItem(key)
            return JSON.parse(retrievedItem)
        } catch (error) {
            console.log(error.message)
        }
    }

    static async retrieveAll() {
        try {            
            keys = await AsyncStorage.getAllKeys()
            storageData = await AsyncStorage.multiGet(keys)
            objects = []
            for([_, jsonString] of storageData) {
                objects.push(JSON.parse(jsonString))
            }
            return objects
            
        } catch (error) {
            console.log(error.message)
        }
    }

    static async delete(key) {
        try {
            AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error.message);
        }
    }
}