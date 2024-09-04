
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/Screens/MainScreen/mainscreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{
            title: 'Vidio Downloader', headerTransparent: true,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: 'rgba(255,255,255,0.5)',
            },
          }}
        />
        {/* <Stack.Screen name="youtube" component={YTDownloader} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App