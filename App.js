import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FrontPage from './screens/FrontPage';
import MainMenu from './screens/MainMenu';
import colors from './colors';
import CameraView from './screens/CameraView';
import PhotoBig from './screens/PhotoBig';

const Root = createStackNavigator({
	startPage: {
		screen: FrontPage,
		navigationOptions: {
			headerShown: false,
		},
	},
	main: {
		screen: MainMenu,
		navigationOptions: {
			title: 'Saved pictures',
			headerStyle: {
				height: 60,
				backgroundColor: colors.darkPrimaryColor,
			},
			headerTitleStyle: {
				color: colors.textPrimaryColor,
			},
		},
	},
	camera: {
		screen: CameraView,
		navigationOptions: {
			title: 'Camera',
			headerStyle: {
				height: 45,
				backgroundColor: colors.darkPrimaryColor,
			},
			headerTitleStyle: {
				color: colors.textPrimaryColor,
			},
		},
	},
	singlePhoto: {
		screen: PhotoBig,
		navigationOptions: {
			title: 'Photo',
			headerStyle: {
				height: 60,
				backgroundColor: colors.darkPrimaryColor,
			},
			headerTitleStyle: {
				color: colors.textPrimaryColor,
			},
		},
	},
});

const App = createAppContainer(Root);

export default App;
