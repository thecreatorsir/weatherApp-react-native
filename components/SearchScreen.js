import React from 'react';
import { StyleSheet, View,ScrollView } from 'react-native';
import { TextInput,Card,List,Button,TouchableRipple } from 'react-native-paper';
import Header from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class SearchScreen extends React.Component {  
  state={
    text:"",
    cities:[]
  }
 
  async buttonpressed(){
    this.props.navigation.navigate("Home")
    await AsyncStorage.setItem('mycity',this.state.text)
  }
  pressplease = (name) => {
    this.setState({text:name})
  } 

  async fetchPlaces(text){
     console.log(text);
     this.setState({text})
     const getResponse = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${text}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "0dd12a1694msh7c5c1e1454858b3p148343jsnb8928d3befc9",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
      }
    });
    const dataResponse = await getResponse.json();
      this.setState({
        cities:dataResponse.data
      }) 
    console.log(this.state.cities) 
  }

  
  render(){
    var renderCity = <Card><List.Item title="No cities"/></Card>
    if(this.state.cities?.length>0){
      renderCity = this.state.cities.map(city=>{
        return (
          <TouchableRipple key={city.latitude}> 
          <Card style={{margin:5}}   ><List.Item title={`${city.name}, ${city.region}`} onPress={()=>this.pressplease(city.name)}/></Card>
          </TouchableRipple>
        )
      })
    }
    return (
      <View style={styles.container}>
        <Header subtitle="select city" color="green" />
        <TextInput
      label="Place"
      value={this.state.text}
      onChangeText={text => this.fetchPlaces(text)}
      />
      <Button mode="contained" style={{margin:20,backgroundColor:"green"}} onPress={()=>this.buttonpressed()}>
    Save Changes
  </Button>
      <ScrollView>
      {renderCity}
      </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});
