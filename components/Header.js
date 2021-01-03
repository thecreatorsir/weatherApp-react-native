import React from 'react';
import { Appbar } from 'react-native-paper';
const Header = ({subtitle,color}) => {  
    return (
      <Appbar.Header style={{ backgroundColor: color }}>
      <Appbar.Content style={{alignItems:'center'}} title="Weather App" subtitle={subtitle} />
    </Appbar.Header>
    );
}
export default Header