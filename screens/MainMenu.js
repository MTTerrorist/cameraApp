import React, { useEffect, useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import NavigationBar from "../modules/NavigationBar";
import PicturesGrid from "../modules/PicturesGrid";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../components/Loader";

const getCameraRollPermissions = async setPermissions => {
  let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  setPermissions(status === "granted");
};

const getPhotos = async (photosSetter, loadingSetter) => {
  loadingSetter(true);

  const photos = await MediaLibrary.getAssetsAsync({
    first: 20, // ilość pobranych assetów
    mediaType: "photo", // typ pobieranych danych, photo jest domyślne
    sortBy: "creationTime"
  });

  // console.log(photos);
  photosSetter(photos.assets);
  loadingSetter(false);
};

const removePhotos = async (idsArray, refreshPhotos) => {
  await MediaLibrary.deleteAssetsAsync(idsArray);
  refreshPhotos();
};

const showToast = message => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};
const MainMenu = ({ navigation }) => {
  const [permissions, setPermissions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gridMode, setGridMode] = useState(true);
  const [selectingMode, setSelectingMode] = useState(false);
  const [selectedPhotosIds, setSelectedPhotos] = useState([]);
  const [photos, setPhotos] = useState([]);

  const refreshPhotos = () => {
    getPhotos(setPhotos, setLoading);
  };

  useEffect(() => {
    getCameraRollPermissions(setPermissions);
  }, []);

  useEffect(() => {
    refreshPhotos();
  }, []);

  const selectPhotoHandler = imageId => {
    if (selectedPhotosIds.length === 0) {
      setSelectingMode(true);
    }

    const pressedPhotoIndex = selectedPhotosIds.indexOf(imageId);

    if (pressedPhotoIndex === -1) {
      return setSelectedPhotos([...selectedPhotosIds, imageId]);
    }

    const newPressed = [...selectedPhotosIds];
    newPressed.splice(pressedPhotoIndex, 1);
    if (newPressed.length === 0) {
      setSelectingMode(false);
    }
    setSelectedPhotos(newPressed);
  };

  const openPhotoHandler = (imageId, imageUri) => {
    navigation.navigate("singlePhoto", {
      imageUri,
      imageId,
      refreshGallery: refreshPhotos
    });
  };

  const removeHandler = () => {
    removePhotos(selectedPhotosIds, refreshPhotos);
    setSelectedPhotos([]);
    setSelectingMode(false);
    showToast(
      `removing ${selectedPhotosIds.length} ${
        selectedPhotosIds.length > 1 ? "photos" : "photo"
      }`
    );
  };

  const navigationItems = [
    {
      text: "Grid/List",
      pressHandler: () => setGridMode(currentGridMode => !currentGridMode)
    },
    {
      text: "Open Camera",
      pressHandler: () =>
        navigation.navigate("camera", { refreshGallery: refreshPhotos })
    },
    {
      text: "Remove selected",
      pressHandler: removeHandler,
      disabled: !selectingMode
    }
  ];

  return (
    <View style={styles.container}>
      <NavigationBar navigationItems={navigationItems} />
      <View style={styles.galleryContainer}>
        {permissions &&
          (loading ? (
            <Loader />
          ) : (
            <PicturesGrid
              photos={photos}
              gridMode={gridMode}
              selectedPhotosIds={selectedPhotosIds}
              selectPhotoHandler={selectPhotoHandler}
              openPhotoHandler={openPhotoHandler}
              selectingMode={selectingMode}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  galleryContainer: {
    flex: 7
  }
});

export default MainMenu;
