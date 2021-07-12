import React, {  useState } from 'react';
import localStyles from './Input.module.css';
import globalStyles from '../../App.module.css';

interface Props {
    label: string;
    elementType: "text" | "select" | "radio" | "time";
    value: any;
    layout: "inline" | "block";
    inputChanged: <T = unknown>(args?: T) => any;
    invalid?: boolean;
    shouldValidate?: boolean;
    touched?: boolean;
    options?: {value: string, text?: string, icon?: string}[];
    width?: "50" | "100";
    info?: string;
    message?: string;
}

const Input:React.FC<Props> = (props) => {
    let inputElement = null;
    let inputError = false;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputError = true;
    }

    switch (props.elementType) {
        case ('text'): inputElement = 
                <input className={`${localStyles.input} ${inputError ? localStyles.inputError : ''}`}
                value={props.value} onChange={props.inputChanged} />
            break;
        case ('select'): inputElement = 
                <select className={`${localStyles.input} ${inputError ? localStyles.inputError : ''}`}
                    value={props.value} onChange={props.inputChanged}>
                    {props.options?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>;
            break;
        case ('radio'): inputElement = 
                <div className={`${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    {props.options?.map((option) => (
                        <label key={option.value} htmlFor={option.value} title={option.text}
                            className={`${localStyles.inputRadio} ${globalStyles.flex} ${globalStyles.flexCenter}
                            ${props.value === option.value ? localStyles.inputRadioActive : ''} ${inputError ? localStyles.inputError : ''}`}>
                            <input type="radio" name={props.label} value={option.value} id={option.value}
                            checked={props.value === option.value} onChange={props.inputChanged} />
                            <span className="material-icons-round">{option.icon}</span>                        
                        </label>
                    ))}
                </div>;
            break;
        default: inputElement =  <input className={inputError ? 'invalid-field' : ''} 
                value={props.value}
                onChange={props.inputChanged} />
            break;
    }
    
    return (
        <div className={`${localStyles.inputBox} ${globalStyles.flexCenterVer} ${props.layout === "block" ? globalStyles.flex : `${globalStyles.flex} ${localStyles.inputBoxInline}`}`}>
            <label className={localStyles.label}>{props.label}</label>
            {inputElement}
            <span className={'input-box__message' + (inputError ? ' input-box__message--error' : '')}>
                {props.message ? props.message : null}
            </span>
        </div>
    );
}

export default Input;