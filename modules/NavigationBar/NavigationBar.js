import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../components/Button';

const NavigationBar = ({ navigationItems }) => {
	return (
		<View style={styles.container}>
			{navigationItems.map(({ text, pressHandler, disabled = false }, index) => (
				<Button key={index} onPress={pressHandler} disabled={disabled}>
					{text}
				</Button>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
});

export default NavigationBar;
