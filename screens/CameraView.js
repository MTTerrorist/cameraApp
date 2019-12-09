import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Dimensions,
  Animated
} from "react-native";
import { Camera } from "expo-camera";
import RoundedButton from "../components/RoundedButton";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import AnimatedView from "../modules/AnimatedView";

const getCameraPermissions = async setPermissions => {
  let { status } = await Permissions.askAsync(Permissions.CAMERA);
  setPermissions(status === "granted");
};

const makePhoto = async camera => {
  let foto = await camera.takePictureAsync();
  let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w DCIM
};
const getSizes = async camera => {
  if (camera) {
    const allSizes = [];
    const sizes = await camera.getAvailablePictureSizesAsync("4:3");
    allSizes = allSizes.concat(sizes);
    const sizes2 = await camera.getAvailablePictureSizesAsync("16:9");
    allSizes = allSizes.concat(sizes2);
    console.log(allSizes);
  }
};
const CameraView = ({ navigation }) => {
  const refreshGallery = navigation.state.params.refreshGallery;
  const [cameraPermissions, setCameraPermissions] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  const cameraParams = {
    whiteBalance: Camera.Constants.WhiteBalance
    //pictureSize: sizes
  };
  const [pos] = useState(new Animated.Value(500));

  const toggle = windowHeight => {
    const toPos = isHidden ? 0 : Math.ceil(Dimensions.get("window").height);

    //animacja
    Animated.spring(pos, {
      toValue: toPos,
      velocity: 1,
      tension: 0,
      friction: 10
    }).start();

    setIsHidden(currentState => !currentState);
  };

  useEffect(() => {
    getCameraPermissions(setCameraPermissions);
    getSizes();
  }, []);

  const onHardwareBackPressHandler = () => {
    refreshGallery();
    navigation.goBack();
    return true; // prevents default behavior
  };

  useEffect(() => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      onHardwareBackPressHandler
    );

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        onHardwareBackPressHandler
      );
    };
  }, []);

  const onChangeCamera = () => {
    setCameraType(currentCameraType =>
      currentCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onMakePhoto = async () => {
    cameraRef && makePhoto(cameraRef);
  };

  // console.log(cameraRef);

  return (
    <View style={styles.container}>
      {cameraPermissions ? (
        <Camera
          onCameraReady={() => console.log("camera ready")}
          type={cameraType}
          style={styles.camera}
          ref={ref => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.iconsContainer}>
            <RoundedButton
              onPress={onChangeCamera}
              iconName="reload1"
              size="small"
            />
            <RoundedButton onPress={onMakePhoto} iconName="plus" size="big" />
            <RoundedButton onPress={toggle} iconName="setting" size="small" />
          </View>
          <AnimatedView pos={pos} />
        </Camera>
      ) : (
        <Text>brak dostępu do kamery</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  optionsMenu: {
    position: "absolute"
  }
});

export default CameraView;
