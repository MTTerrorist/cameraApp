import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Button from "../components/Button";
import * as MediaLibrary from "expo-media-library";

const removePhotos = async (idsArray, refreshPhotos) => {
  await MediaLibrary.deleteAssetsAsync(idsArray);
  refreshPhotos();
};

const PhotoBig = ({ navigation }) => {
  const { params } = navigation.state;

  const imageUri = params.imageUri;
  const imageId = params.imageId;
  const refreshGallery = params.refreshGallery;

  const onRemoveHandler = () => {
    Alert.alert("Removing photo", "Do you really want to remove it?", [
      { text: "Cancel", onPress: null, style: "cancel" },
      {
        text: "Confirm",
        onPress: async () => {
          await removePhotos([imageId], refreshGallery);
          navigation.navigate("main");
        },
        style: "destructive"
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 5 }}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode={"contain"}
        />
      </TouchableOpacity>
      <Button style={{ flex: 1 }} onPress={onRemoveHandler}>
        Usuń zdjęcie
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});

export default PhotoBig;
