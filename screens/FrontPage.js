import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import colors from '../colors';

const FrontPage = ({ navigation }) => {
	const features = ['show gallery pictures', 'take pictures from camera', 'save photo to device', 'delete photo from device'];

	return (
		<View style={styles.container}>
			<View style={styles.headlineContainer}>
				<Text style={styles.headlineTextBig}>Camera App</Text>
				{features.map((feature, index) => (
					<Text key={index} style={styles.headlineTextSm}>
						{feature}
					</Text>
				))}
			</View>

			<View style={styles.whitespaceContainer}>
				<View style={styles.startBtnContainer}>
					<Button onPress={() => navigation.navigate('main')}>Start</Button>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headlineContainer: {
		flex: 1,
		backgroundColor: colors.defaultPrimaryColor,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headlineTextBig: {
		color: colors.textPrimaryColor,
		fontSize: 50,
	},
	headlineTextSm: {
		color: colors.primaryTextColor,
		fontSize: 20,
	},
	whitespaceContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	startBtnContainer: {
		height: 50,
		width: '50%',
	},
});

export default FrontPage;
