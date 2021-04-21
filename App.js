import React from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation from './components/Navigation'
import { setLocalNotification } from './utils/helpers'

class App extends React.Component{
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
        <View style={styles.container}>
          <Navigation/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#45b4ba"
  },
});

export default App;
