import * as React from 'react';
import DeckListScreen from "./DeckList";
import AddDeckScreen from "./AddDeck";
import DeckDetails from "./DeckDetails";
import AddCardScreen from "./AddCard";
import Quiz from "./Quiz";
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Ionicons} from "@expo/vector-icons";

const HomeNavigator = createBottomTabNavigator({
        Decks: {
            screen: DeckListScreen
        },
        Add: {
            screen: AddDeckScreen,
            navigationOptions: {
                title: 'Add Deck'
            }
        }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Decks') {
                    iconName = focused
                        ? 'book'
                        : 'book-outline';
                } else if (routeName === 'Add') {
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

const TabNavigation = createAppContainer(HomeNavigator);

const Navigation = createAppContainer(createStackNavigator(
    {
        Home: {
            screen: TabNavigation
        },
        DeckDetails: {
            title: 'Deck Details',
            screen: DeckDetails
        },
        AddCard: {
            title: 'Add Card',
            screen: AddCardScreen
        },
        Quiz: {
            title: 'Quiz',
            screen: Quiz
        }
    },
    {
        initialRouteName: 'Home',
        header: null,
        headerMode: 'none'
    })
);

export default Navigation;
