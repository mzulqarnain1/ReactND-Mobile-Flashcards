import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import * as React from "react";
import { addCardToDeck } from "../utils/api";
import Deck from "./Deck";

class AddCardScreen extends React.Component{
    state = {
        question: '',
        answer: ''
    }
    handleChange = (elem, value) => {
        this.setState({
            [elem]: value
        })
    }
    submit = () => {
        const { question, answer } = this.state
        const { navigation } = this.props
        const { title, questions } = navigation.state.params
        if(question && answer){
            const card = {question: question, answer: answer}
            addCardToDeck(title, card)
            alert('Card added to deck.')
            this.props.navigation.navigate('DeckDetails', {title: title, questions: questions.concat(card)})
        }else{
            alert('Please fill both fields.')
        }
    }
    render() {
        const { navigation } = this.props
        const { title, questions } = navigation.state.params
        return (
            <View style={styles.Tab}>
                <Text style={styles.title}>Add Card</Text>
                <Deck
                    title={title}
                    questions={questions}
                    onPress={() => {}}
                />
                <TextInput
                    style={styles.input1}
                    placeholder="Question"
                    onChangeText={text => this.handleChange('question', text)}
                    defaultValue={this.state.question}
                />
                <TextInput
                    style={styles.input2}
                    placeholder="Answer"
                    onChangeText={text => this.handleChange('answer', text)}
                    defaultValue={this.state.answer}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.submit}
                >
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Save Card</Text>
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
        padding: 20
    },
    input1: {
        height: 90,
        width: 350,
        marginTop: 100,
        marginBottom: 20,
        borderWidth: 3,
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: 10
    },
    input2: {
        height: 90,
        width: 350,
        marginBottom: 50,
        borderWidth: 3,
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 20
    },
    button: {
        fontWeight: "bold",
        justifyContent: 'center',
        height: 70,
        width: 180,
        backgroundColor: "green",
        padding: 10,
        borderRadius: 10
    }
})

export default AddCardScreen;
