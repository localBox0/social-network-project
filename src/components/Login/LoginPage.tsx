import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from "./../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit,error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder ={'Email'} name={"email"}
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

type LoginFormValuesType = {
    email: string, password: string, rememberMe: boolean, captcha: string
}

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()
    const onSubmit = (formData: LoginFormValuesType) => {dispatch(login
    (formData.email, formData.password, formData.rememberMe, formData.captcha))}
    if (isAuth) {
        return < Redirect to={"/profile"} />
    }
    return <div>
        <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}