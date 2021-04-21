import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";

export default function Deck(props) {
    const {title, questions, onPress} = props
    return (
        <View style={styles.Deck}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onPress(title, questions)}
            >
                <View style={styles.Tab}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.cards}>{questions.length} Cards</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Deck: {
        paddingBottom: 15
    },
    Tab: {
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        height: 100,
        width: 300,
        backgroundColor: "#c477d4",
        padding: 10,
        borderRadius: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        color: 'white',
        marginBottom: 10
    },
    cards: {
        fontSize: 12,
        color: 'white'
    }
})
