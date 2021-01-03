import React from 'react';
import { StyleSheet, View,Image } from 'react-native';
import { Card,Title } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header'
export default class HomeScreen extends React.Component {  
  
  state={
    info:{
      name:'loading !!',
      temperature:'loading !!',
      discription:'loading !!',
      icon:'loading !!',
      humidity:'loading !!',
      region:""
    },
  }
 
  async getData(){
    let city = await AsyncStorage.getItem('mycity')
    if(!city){
      city = 'ludhiana'
    }
    
    const getResponse = await fetch(
     `http://api.weatherstack.com/current?access_key=1f87bc62b5f342682cf0044f0f4afbb2&query=${city}`
   );
   const dataResponse = await getResponse.json();
   this.setState({
     info:{
       name:dataResponse.location?.name,
       temperature:dataResponse.current?.temperature,
       discription:dataResponse.current?.weather_descriptions[0],
       icon:dataResponse.current?.weather_icons[0],
       humidity:dataResponse.current?.humidity,
       region:dataResponse.location?.region
     }
   })
   console.log(dataResponse);
 }
 unsubscribe = this.props.navigation.addListener('focus', () => {
  this.getData();
});

   render(){ 
    return (
      <View style={styles.container}>
        <Header  subtitle="Current Weather" color="blue" />
        <Card style={{margin:20}}>
          <LinearGradient colors={['#021B79','#0575E6']}>
          <View style={{padding:20,alignItems:'center'}}>
            <Title style={styles.text}>
            {this.state.info.name}, {this.state.info.region}
            </Title>
            <Title style={styles.text}>
            Temperature: {this.state.info.temperature} °C
            </Title>
            <Image source={{uri:this.state.info.icon}} style={{width:50,height:50}}/>
            <Title style={styles.text}>
            {this.state.info.discription}
            </Title>
            <Title style={styles.text}>
            Humidity: {this.state.info.humidity}
            </Title>
          </View>
          </LinearGradient>
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  text:{
    textAlign:"center",
    marginBottom:10,
    color:'white'
  }
});
