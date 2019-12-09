import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../colors';

const Button = ({ onPress, children, disabled }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{ ...styles.opacity, backgroundColor: disabled ? colors.secondaryTextColor : colors.darkPrimaryColor }}
			disabled={disabled}
		>
			<View style={styles.container}>
				<Text style={styles.text}>{children}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	opacity: {
		flex: 1,
		padding: 10,
		margin: 5,
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		textTransform: 'uppercase',
		color: colors.textPrimaryColor,
	},
});

export default Button;
