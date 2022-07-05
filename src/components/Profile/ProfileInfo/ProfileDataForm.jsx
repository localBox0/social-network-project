import React from "react";
import {Field, reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';
import {Input, Textarea} from "../../common/FormsControls/FormsControls";


const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>Save info</button></div>
        { error && <div className={s.formSummaryError}>
            {error}
        </div>
        }
        <div>
            <b>Full name</b>: <Field placeholder={'Full name'} name={"fullName"}
                                                        component={Input}/>
        </div>
        <div>
            <b>Looking for a job</b>: <Field name={"lookingForAJob"} component={Input} type={"checkbox"}/>
        </div>
            <div>
                <b>My skills</b>: <Field placeholder={'My professional skills...'}
                                                                            name={"lookingForAJobDescription"}
                                                                            component={Textarea}/>
            </div>
        <div>
            <b>About me</b>: <Field placeholder={'Information about me...'} name={"aboutMe"}
                                                     component={Textarea}/>
        </div>
        <div>
            <b>Contacts</b> {Object.keys(profile.contacts).filter(key => key !== 'vk').map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}: <Field placeholder={key} name={"contacts." + key}
                                 component={Input}/></b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxFrom = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxFrom;