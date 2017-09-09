import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default ({uri}) => (
  <Animatable.View animation="fadeIn">
    <Image style={mainImgStyles.mainCatImg} source={{uri}}></Image>
  </Animatable.View>
)

const mainImgStyles = StyleSheet.create({
  mainCatImg: {
    height: 300,
    width: "100%",
  }
})
