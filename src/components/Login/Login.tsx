import React from 'react';
import {reduxForm} from 'redux-form';
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {connect, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {StoreType} from "../../redux/redux-store";
import {Input, createField} from "../common/FormsControl/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from 'react-router-dom';
import styles from './../common/FormsControl/FormsControls.module.css'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";

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
            <FormControl>
                <FormLabel>
                    <p>To log in get registered <span> </span>
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                {createField("email", "email", [required], Input)}
                {createField("password", "password", [required], Input, {type : "password"})}
                <FormControlLabel
                    label={'Remember me'}
                    control={<Checkbox name={"rememberMe"}
                    />}
                />
                {captchaURL && <img src={captchaURL}/>}
                {captchaURL && createField("Symbols from the image", "captchaURL", [required], Input)}
                {error && <div className={styles.formSummaryError}>
                    {error}
                </div>}
                <Button type={'submit'} variant={'contained'} color={'primary'} style={{marginTop: "15px"}}>Login</Button>
            </FormControl>
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
        <Paper style={{padding : "20px 60px 40px", marginTop: "20px"}}>
            <Typography variant={"h3"} component={"h3"} style={{textAlign: "center", marginBottom: "15px"}}>Login</Typography>
            <LoginReduxForm onSubmit={onSubmit}/>
        </Paper>
    )
}

const LoginContainer = connect(mapStateToProps, {login})(Login)

export default LoginContainer
