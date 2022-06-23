const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs : [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Bogdan'},
        {id: 3, name: 'Igor'},
        {id: 4, name: 'Finik'},
        {id: 5, name: 'Elsa'},
        {id: 6, name: 'Pantera'},
    ],
    messages : [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo!'},
        {id: 4, message: 'Good morning'},
        {id: 5, message: 'Hello'},
        {id: 6, message: 'Brrr'},
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 7, message: body}]
            }
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;