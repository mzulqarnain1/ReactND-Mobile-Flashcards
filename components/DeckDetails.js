import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import Deck from './Deck'
import { removeDeck } from "../utils/api";

function deleteDeck(navigation, title){
    removeDeck(title)
    alert('Deck Deleted.')
    navigation.navigate('Home')
}
export default function DeckDetails(props) {
    const { navigation } = props
    const { title, questions } = navigation.state.params
    return (
        <View style={styles.Deck}>
            <Text style={styles.title}>Deck Details</Text>
            <Deck title={title} questions={questions} onPress={() => {}}/>
            <TouchableOpacity
                style={styles.add}
                onPress={() => navigation.navigate('AddCard', {title, questions})}
            >
                <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.start}
                onPress={() => navigation.navigate('Quiz', {title, questions})}
            >
                <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {deleteDeck(navigation, title)}}
            >
                <Text style={[styles.buttonText, {color: 'black', textDecorationLine: 'underline'}]}>Delete Deck</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Deck: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 15,
        backgroundColor: '#b6f2b1'
    },
    Tab: {
        alignItems: 'center'
    },
    add: {
        justifyContent: 'center',
        height: 60,
        width: 150,
        backgroundColor: "red",
        padding: 10,
        marginTop: 200,
        marginBottom: 30,
        borderRadius: 10
    },
    start: {
        justifyContent: 'center',
        height: 60,
        width: 150,
        backgroundColor: "green",
        marginBottom: 30,
        borderRadius: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 50,
        marginTop: 100,
    },
    cards: {
        fontSize: 13
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }

})
