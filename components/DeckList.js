import {Text, ScrollView, View, StyleSheet} from "react-native";
import * as React from "react";
import { getDecks } from "../utils/api";
import Deck from "./Deck";

class DeckListScreen extends React.Component {
    state = {
        decks: []
    }
    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.onScreenFocus)
    }
    onScreenFocus = () => {
        getDecks().then((decks) => {
            this.setState({
                decks: JSON.parse(decks)
            })
        })
    }
    toDetails = (title, questions) => {
        const { navigation } = this.props
        navigation.navigate('DeckDetails', {title: title, questions: questions})
    }
    render() {
        const { decks } = this.state
        return (
            <ScrollView style={styles.Scroll}>
                <View style={styles.Tab}>
                    <Text style={styles.title}>Udacity Mobile Flashcards</Text>
                    {decks && Object.keys(decks).map(key => (
                        <Deck
                            key={key}
                            title={key}
                            questions={decks[key].questions}
                            onPress={this.toDetails}
                        />
                    ))}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    Scroll: {
        flex: 5, // 5:6
        backgroundColor: '#b6f2b1',
        padding: 30
    },
    Tab: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        paddingBottom: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        justifyContent: 'center',
        height: 100,
        width: 300,
        backgroundColor: "#c477d4",
        padding: 10
    }
})

export default DeckListScreen;
