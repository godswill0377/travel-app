import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import StartScreen from "../screens/Start";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import ForgetPassScreen from "../screens/ForgetPass";
import TermsGuestScreen from "../screens/TermsGuest";
import ColorsApp from '../utils/ColorsApp';

export default StackNavigator(
	{
		Start: {
			screen: StartScreen
		},

		Login: {
			screen: LoginScreen
		},
		Register: {
			screen: RegisterScreen
		},
		ForgetPass: {
			screen: ForgetPassScreen
		},
		Terms: {
			screen: TermsGuestScreen
		},
	},
	{
		initialRouteName: 'Start',
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#ffffff',
				borderWidth: 0,
				borderBottomWidth: 0
				},
			headerTintColor: '#000',
			headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 16,
				color: '#000',
				fontWeight: 'bold',
			}
		}

	}
)