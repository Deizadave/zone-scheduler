import localStyles from './Input.module.css';
import globalStyles from '../../App.module.css';

interface Props {
    label: string;
    elementType: "text" | "select" | "multipleSelect" | "radio";
    value: any;
    layout: "inline" | "block";
    inputChanged: <T = unknown>(args?: T) => any;
    index: string;
    elementConfig?: string;
    invalid?: boolean;
    shouldValidate?: boolean;
    touched?: boolean;
    options?: {value: string | number, text?: string, icon?: string}[];
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
                id={props.index} value={props.value} {...props.elementConfig} onChange={props.inputChanged} />
            break;
        case ('select'): inputElement = <>
                    <select className={`${localStyles.input} ${inputError ? localStyles.inputError : ''}`}
                        id={props.index} value={props.value} {...props.elementConfig} onChange={props.inputChanged}>
                        <option disabled></option>
                        {props.options?.map((option) => (
                            <option value={option.value} key={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </>;
            break;
        case ('multipleSelect'): inputElement = <>
                    {props.value.length ?
                        <div className={`${localStyles.selectedOptions} ${globalStyles.flex}`}>
                            {props.value.map((val: number) => {
                                const option = props.options?.find(o => (o.value.toString() === val.toString()));

                                return (
                                    <button key={val} onClick={() => props.inputChanged({target: {value: val}})}
                                        className={localStyles.selectedOption}>
                                        {option?.text}&nbsp;&nbsp;X
                                    </button>
                                )
                            })}
                        </div>
                    : null}
                    <select className={`${localStyles.input} ${inputError ? localStyles.inputError : ''}`}
                        id={props.index} defaultValue={`Select ${props.label}`} onChange={props.inputChanged}>
                        <option value={`Select ${props.label}`} disabled>{`Select ${props.label}`}</option>
                        {props.options?.filter(option => !props.value.includes(option.value.toString())).map((option) => (
                            <option value={option.value} key={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </>;
            break;
        case ('radio'): inputElement = 
                <div className={`${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    {props.options?.map((option) => (
                        <label key={option.value} htmlFor={option.value.toString()} title={option.text}
                            className={`${localStyles.inputRadio} ${globalStyles.flex} ${globalStyles.flexCenter}
                            ${props.value === option.value ? localStyles.inputRadioActive : ''} ${inputError ? localStyles.inputError : ''}`}>
                            <input type="radio" name={props.label} value={option.value} id={option.value.toString()}
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
        <div className={`
                ${localStyles.inputBox}
                ${props.layout === "block" ? `${globalStyles.flex} ${globalStyles.flexColumn}` : `${globalStyles.flex} ${globalStyles.flexCenterVer} ${localStyles.inputBoxInline}`}`
            }>
            <label className={localStyles.label} htmlFor={props.index}>{props.label}</label>
            {inputElement}
            <span className={'input-box__message' + (inputError ? ' input-box__message--error' : '')}>
                {props.message ? props.message : null}
            </span>
        </div>
    );
}

export default Input;