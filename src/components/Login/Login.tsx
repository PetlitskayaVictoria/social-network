import React from 'react';
import {reduxForm} from 'redux-form';
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {connect, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {StoreType} from "../../redux/redux-store";
import {Input, createField} from "../common/FormsControl/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from 'react-router-dom';
import styles from'./../common/FormsControl/FormsControls.module.css'

type MapStateToPropsType = {
    captchaURL: string | null
    isAuth: boolean
}

const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        captchaURL : state.auth.captchaURL,
        isAuth : state.auth.isAuth
    }
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaURL: string) => void
}

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captchaURL: string
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    const captchaURL = useSelector<StoreType, string | null>(state => state.auth.captchaURL)

    return (
        <form onSubmit={handleSubmit}>
            {createField("email", "email", [required], Input)}
            {createField("password", "password", [required], Input, {type: "password"})}
            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember me")}
            {captchaURL && <img src={captchaURL}/>}
            {captchaURL && createField("Symbols from the image", "captchaURL", [required], Input)}
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<FormDataType>({
    form : "login"
})(LoginForm)

export const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        let {email, password, rememberMe, captchaURL} = formData
        props.login(email, password, rememberMe, captchaURL)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    )
}

const LoginContainer = connect(mapStateToProps, {login})(Login)

export default LoginContainer
