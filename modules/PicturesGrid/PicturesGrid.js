import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import ImageItem from '../../components/ImageItem';

const PicturesGrid = ({ gridMode, selectPhotoHandler, selectedPhotosIds, selectingMode, photos, openPhotoHandler }) => {
	const width = Dimensions.get('window').width;

	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={{ width }}
				data={photos}
				keyExtractor={picture => picture.id}
				numColumns={gridMode ? 4 : 1}
				key={gridMode ? 4 : 1}
				renderItem={({ item }) => (
					<ImageItem
						identifier={item.id}
						imageSource={{ uri: item.uri }}
						screenWidth={width}
						gridMode={gridMode}
						isSelected={selectedPhotosIds.includes(item.id)}
						selectPhotoHandler={() => selectPhotoHandler(item.id)}
						showPhotoHandler={() => openPhotoHandler(item.id, item.uri)}
						selectingMode={selectingMode}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default PicturesGrid;
