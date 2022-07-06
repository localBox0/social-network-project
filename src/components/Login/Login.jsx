import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from "./../common/FormsControls/FormsControls.module.css"

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={"email"}
                       validate={[required]} component={Input} />
            </div>
            <div>
                <Field placeholder={'Password'} name={"password"}
                       validate={[required]} component={Input} type={"password"}/>
            </div>
            <div>
                remember me<Field component={Input} name={"rememberMe"} type={"checkbox"}/>
            </div>
            <div>
                { captchaUrl && <img src={captchaUrl}/>}
                { captchaUrl && <Field placeholder={'Symbolls from image'} component={Input}
                                       name={"captcha"} validate={[required]}/>}
            </div>
            { error && <div className={s.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)}
    if (props.isAuth) {
        return < Redirect to={"/profile"} />
    }
    return <div>
        <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {login})(Login);