import {InferActionsTypes} from "./redux-store";

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

const dialogsReducer = (state = initialState,
                        action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'DIALOGS/SEND-MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 7, message: body}]
            }
        default:
            return state;
    }
}
export const actions = {
    sendMessage : (newMessageBody: string) => ({type: 'DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>