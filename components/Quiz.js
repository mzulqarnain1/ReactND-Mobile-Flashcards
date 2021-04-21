import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends React.Component {
    state = {
        attempted: 0,
        score: 0,
        showAnswer: false
    }
    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
    }
    toggleQuestionAnswer(){
        this.setState((prevState) => {
            return {showAnswer: !prevState.showAnswer};
        });
    }
    handleAnswer(answer){
        this.setState((prevState) => {
            return {
                score: answer === 'correct' ? prevState.score + 1 : prevState.score,
                attempted: prevState.attempted + 1
            };
        });
    }
    resetQuiz(){
        this.setState({
            attempted: 0,
            score: 0,
            showAnswer: false
        })
    }
    render() {
        const { attempted, score } = this.state
        const { navigation } = this.props
        const { title, questions } = navigation.state.params

        if(!questions.length){
            return(
                <View style={styles.Deck}>
                    <Text style={[styles.Title, {color: 'green', fontSize: 30}]}>Quiz View</Text>
                    <Text style={[styles.Title, {color: 'purple', fontSize: 30}]}>Deck Title: {title}</Text>
                    <Text style={[styles.Title, {margin: 10, textAlign: 'center',color: 'red'}]}>Sorry, There are no questions in this deck. Please add some questions before attempting a quiz.</Text>
                    <TouchableOpacity
                        style={styles.Correct}
                        onPress={() => navigation.navigate('AddCard', {title, questions})}
                    >
                        <Text style={styles.ButtonText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Incorrect}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.ButtonText}>Dashboard</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        if(attempted >= questions.length){
            return(
                <View style={styles.Deck}>
                    <Text style={[styles.Title, {color: 'green', fontSize: 30}]}>Quiz View</Text>
                    <Text style={[styles.Title, {color: 'purple', fontSize: 30}]}>Deck Title: {title}</Text>
                    <Text style={[styles.Title, {margin: 10, textAlign: 'center',color: 'red'}]}>Your scored {score} out of {questions.length}</Text>
                    <TouchableOpacity
                        style={styles.Correct}
                        onPress={() => this.resetQuiz()}
                    >
                        <Text style={styles.ButtonText}>Retake Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Incorrect}
                        onPress={() => navigation.navigate('DeckDetails', {title, questions})}
                    >
                        <Text style={styles.ButtonText}>Deck Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Correct}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.ButtonText}>Dashboard</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.Deck}>
                <Text style={styles.Title}>Quiz View</Text>
                <Text style={[styles.Title, {color: 'purple', fontSize: 30}]}>Deck Title: {title}</Text>
                <View style={styles.Question}>
                    <Text style={styles.Number}>{this.state.showAnswer ? 'Answer': 'Question'} {attempted+1} of {questions.length}</Text>
                    {this.state.showAnswer &&
                        <Text style={styles.TextArea}>{questions[attempted]['answer']}</Text>
                    }
                    {!this.state.showAnswer &&
                        <Text style={styles.TextArea}>{questions[attempted]['question']}</Text>
                    }
                </View>
                <TouchableOpacity
                    style={styles.Answer}
                    onPress={() => this.toggleQuestionAnswer()}
                >
                    <Text style={{textAlign: 'center', color:'white', fontWeight: 'bold'}}>See {this.state.showAnswer ? 'Question' : 'Answer'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.Correct}
                    onPress={() => this.handleAnswer('correct')}
                >
                    <Text style={styles.ButtonText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.Incorrect}
                    onPress={() => this.handleAnswer('incorrect')}
                >
                    <Text style={styles.ButtonText}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Deck: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 15,
        backgroundColor: '#b6f2b1',
        paddingTop: 20,
    },
    Tab: {
        alignItems: 'center'
    },
    Title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 50,
        marginTop: 50,
    },
    Question: {
        backgroundColor: 'whitesmoke',
        height: 270,
        width: 300,
        borderRadius: 20
    },
    Answer: {
        justifyContent: 'center',
        height: 40,
        width: 100,
        backgroundColor: "cornflowerblue",
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 5
    },
    Correct: {
        justifyContent: 'center',
        height: 60,
        width: 150,
        backgroundColor: "green",
        marginTop: 30,
        marginBottom: 20,
        borderRadius: 10
    },
    Incorrect: {
        color: '#fff',
        justifyContent: 'center',
        height: 60,
        width: 150,
        backgroundColor: "red",
        marginBottom: 30,
        borderRadius: 10
    },
    Number: {
        textDecorationLine: 'underline',
        marginTop: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    TextArea: {
        marginTop: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 24
    },
    Add: {
        justifyContent: 'center',
        height: 90,
        width: 150,
        backgroundColor: "yellowgreen",
        padding: 10,
        marginTop: 200,
        marginBottom: 30
    },
    Button: {
        justifyContent: 'center',
        height: 60,
        width: 150,
        backgroundColor: "#d07bd1",
        padding: 10,
        marginTop: 20,
        marginBottom: 10
    },
    ButtonText: {
        textAlign: 'center',
        color:'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})


export default Quiz

