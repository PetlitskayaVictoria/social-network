import React from 'react';
import styles from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps} from "redux-form";
import {TextareaAutosize, TextField} from "@material-ui/core";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    input: any
}

export const TextArea: React.FC<FormControlPropsType> = ({input, meta, ...props}) => {
    let hasError = meta.error && meta.touched
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <TextareaAutosize {...input} {...props}/>
            </div>
            <div className={styles.formControl + " " + styles.error}>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Input: React.FC<FormControlPropsType> = ({input, meta, ...props}) => {
    let hasError = meta.error && meta.touched
    return (
        <div>
            <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
                <TextField {...input} {...props} style={{width: "300px"}}/>
            </div>
            <div className={styles.formControl + " " + styles.error}>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const createField = (placeholder: string | null, name: string, validators: Array<(value: string) => string | undefined>, component: (props: any) => any, props?: any, text?: string) => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               component={component}
               validate={validators}
               {...props}

        /> {text}
    </div>
)
