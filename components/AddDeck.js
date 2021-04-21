import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import * as React from "react";
import { saveDeck } from "../utils/api";

class AddDeckScreen extends React.Component{
    state = {
        title: ''
    }
    handleChange = (text) => {
        this.setState({
            title: text
        })
    }
    submit = () => {
        if(this.state.title) {
            saveDeck(this.state.title).then((res) => {
                alert('Deck Saved')
                this.props.navigation.navigate('DeckDetails', {title: this.state.title, questions: []})
            })
        }
        else{
            alert('Please enter a title')
        }
    }
    render() {
        return (
            <View style={styles.Tab}>
                <Text style={styles.title}>Add Deck</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Deck Title"
                    onChangeText={text => this.handleChange(text)}
                    defaultValue={this.state.title}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.submit}
                >
                    <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Save Deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b6f2b1',
        padding: 20,
        marginTop: 40
    },
    input: {
        height: 80,
        width: 300,
        margin: 50,
        borderWidth: 2,
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
    },
    button: {
        fontWeight: "bold",
        justifyContent: 'center',
        height: 80,
        width: 170,
        backgroundColor: "#c477d4",
        padding: 10,
        borderRadius: 10
    }
})

export default AddDeckScreen
