import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogsItem";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {InitialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}
type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage;
    let messagesElement = state.messages
        .map( m => <Message message={m.message} key={m.id}/>)
    let dialogsElements = state.dialogs
        .map( d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElement}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

const maxLengthCreator350 = maxLengthCreator(350)
type FormPropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, FormPropsType> & FormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder="Type your message" name="newMessageBody"
                        validate={[required, maxLengthCreator350]} component={Textarea}/></div>
            <div><button>Send message</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, FormPropsType>({
    form: "dialogAddMessageForm"
})(AddMessageForm);



export default Dialogs;