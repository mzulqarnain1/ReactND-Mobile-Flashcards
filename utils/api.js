import AsyncStorage from '@react-native-async-storage/async-storage'

const DECKS_STORAGE_KEY = 'mobile-flashcards:decks'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function getDeck(id) {
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
        return JSON.parse(decks)[id]
    })
}

export function saveDeck(title) {
    const newDeck = JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    })
    return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        newDeck
    )
}

export function addCardToDeck(title, card) {
    try{
        getDecks().then((decks) => {
            const allDecks = JSON.parse(decks)
            AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                [title]: {
                    questions: [...allDecks[title].questions].concat(card)
                }
            })).then(() => {
                return [...allDecks[title].questions].concat(card)
            })
        })
    }
    catch(err){
        alert('Error saving card to deck.')
    }

}

export function removeDeck(key) {
    getDecks().then((decks) => {
        const allDecks = JSON.parse(decks);
        delete allDecks[key];
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(allDecks));
    })
}
