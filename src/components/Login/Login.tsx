import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {StoreType} from "../../redux/redux-store";
import {Input} from "../common/FormsControl/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from 'react-router-dom';
import styles from'./../common/FormsControl/FormsControls.module.css'

type MapStateToPropsType = {
    captcha: boolean
    isAuth: boolean
}

const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        captcha : state.auth.captcha,
        isAuth : state.auth.isAuth
    }
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: boolean) => void
}

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"email"} name="email" component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={"password"} name="password" type={"password"} component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input}/> Remember me
            </div>
            {props.error && <div className={styles.formSummaryError}>
                {props.error}
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
        let {email, password, rememberMe, captcha} = formData
        props.login(email, password, rememberMe, captcha)
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
