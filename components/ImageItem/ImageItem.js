import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../../colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ImageItem = ({ imageSource, identifier, screenWidth, gridMode, showPhotoHandler, selectPhotoHandler, isSelected, selectingMode }) => {
	const { container, image, text, tickContainer, tickImage } = generateStyles(screenWidth, gridMode, isSelected);

	return (
		<TouchableOpacity
			style={container}
			onPress={selectingMode ? selectPhotoHandler : showPhotoHandler}
			onLongPress={selectingMode ? null : selectPhotoHandler}
		>
			<Image style={image} source={imageSource} />
			<Text style={text}>{identifier}</Text>
			<View style={tickContainer}>
				<Image source={require('../../assets/tick.png')} style={tickImage} />
			</View>
		</TouchableOpacity>
	);
};

const generateStyles = (screenWidth: number, gridMode: boolean, isSelected: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
			margin: 6,
		},
		image: {
			width: gridMode ? screenWidth / 4 - 2 * 6 : screenWidth - 2 * 6,
			height: gridMode ? screenWidth / 4 : 200 - 2 * 6,
			opacity: isSelected ? 0.4 : 1,
		},
		text: {
			position: 'absolute',
			color: colors.textPrimaryColor,
			textShadowColor: colors.accentColor,
			textShadowRadius: 3,
			textShadowOffset: { width: 2, height: 2 },
			width: '100%',
			bottom: 0,
			right: 0,
		},
		tickContainer: {
			position: 'absolute',
			opacity: isSelected ? 1 : 0,
		},
		tickImage: {
			width: gridMode ? (screenWidth / 4) * 0.4 : 75,
			height: gridMode ? (screenWidth / 4) * 0.4 : 75,
		},
	});

export default ImageItem;
