import React from 'react';
import styles from './FormsControls.module.css'
import {WrappedFieldMetaProps} from "redux-form";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    input: any
}

export const TextArea: React.FC<FormControlPropsType> = ({ input, meta, ...props }) => {
    let hasError = meta.error && meta.touched
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            <div className={styles.formControl + " " + styles.error}>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Input: React.FC<FormControlPropsType> = ({ input, meta, ...props } ) => {
    let hasError = meta.error && meta.touched
    return (
        <div>
            <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
                <input {...input} {...props}/>
            </div>
            <div className={styles.formControl + " " + styles.error}>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}
