const SEND_MESSAGE = 'SEND-MESSAGE'

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
let initialState = {
    dialogs : [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Bogdan'},
        {id: 3, name: 'Igor'},
        {id: 4, name: 'Finik'},
        {id: 5, name: 'Elsa'},
        {id: 6, name: 'Pantera'},
    ] as Array<DialogType>,
    messages : [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo!'},
        {id: 4, message: 'Good morning'},
        {id: 5, message: 'Hello'},
        {id: 6, message: 'Brrr'},
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState,
                        action: any): InitialStateType => {
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

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType =>
    ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;