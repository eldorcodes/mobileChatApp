import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Dashboard, SignUp, Login, 
    AuthHelper, UserProfile, 
    ChatRoom, MainProfile } from "../component/main";

const Stack = createStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthHelper" 
            screenOptions={{
                headerShown: true,
                headerStyle: {backgroundColor: 'grey'},
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 18
                }
            }}>
                <Stack.Screen name="AuthHelper" 
                component={AuthHelper} options={{
                    headerShown: false
                }}></Stack.Screen>
                <Stack.Screen name="Login" component={Login} options={{
                    headerShown: false
                }}>
                </Stack.Screen>
                <Stack.Screen name="SignUp" component={SignUp} options={{
                    headerShown: false
                }}>
                </Stack.Screen>
                <Stack.Screen name="Dashboard" component={Dashboard} 
                options={{
                    headerLeft: null
                }}>
                </Stack.Screen>

                <Stack.Screen name="MainProfile" 
                component={MainProfile} options={{
                    headerLeft: null
                }}>
                </Stack.Screen>

                <Stack.Screen name="UserProfile" 
                component={UserProfile}>
                </Stack.Screen>

                <Stack.Screen name="ChatRoom" component={ChatRoom}>
                </Stack.Screen>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;