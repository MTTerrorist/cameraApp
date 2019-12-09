import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";

export const getCameraRollPermissions = async setPermissions => {
  let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  setPermissions(status === "granted");
};

export const getPhotos = async (photosSetter, loadingSetter) => {
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

export const makePhoto = async camera => {
  let foto = await camera.takePictureAsync();
  let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w DCIM
};

export const removePhotos = async (idsArray, refreshPhotos) => {
  await MediaLibrary.deleteAssetsAsync(idsArray);
  refreshPhotos();
};

export const showToast = message => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};
