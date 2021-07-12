import { useState } from 'react';
import localStyles from './Scheduler.module.css';
import globalStyles from '../../App.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';

interface Props {
    show: boolean;
    close: () => void;
}

const Scheduler = ({show, close}: Props) => {
    const initialForm = {
        fields: {
            zones: {
                label: 'Zones', elementType: 'multipleSelect',
                layout: 'block', value: [],
                options: [
                    {value: 'sd0', text: 'All zones'},
                    {value: 'sd1', text: 'sd1'},
                    {value: 'sd2', text: 'sd2'},
                    {value: 'sd3', text: 'sd3'}
                ],
                valid: false
            },
            temperature: {
                label: 'Temperature', elementType: 'text',
                layout: 'block', value: '',
                elementConfig: {type: 'number', step: '0.1'},
                valid: false
            },
            time: {
                label: 'Time', elementType: 'text',
                layout: 'block', value: '',
                elementConfig: {type: 'datetime-local'},
                valid: false
            }
        },
        isValid: false
    };
    const [form, setForm] = useState<any>({...initialForm});
    
    const formFieldArray = [];
    for (let key in form.fields) {
        formFieldArray.push({
            id: key,
            config: form.fields[key]
        });
    }

    const inputChangedHandler = (e: any, field: string) => {
        console.log(e.target.value);

        const updatedForm = {...form.fields};
        const updatedFormField = {...updatedForm[field]};
        let value = e.target.value;
        if (updatedFormField.elementType === "multipleSelect") {
            value = updatedFormField.value.includes(value) ?
                [...updatedFormField.value.filter((v: string) => v !== value)] : [...updatedFormField.value, value];
        }
        updatedFormField.value = value;        
        updatedFormField.valid = checkFieldValidity(updatedFormField.value, updatedFormField.elementType);
        updatedForm[field] = updatedFormField;
        
        let formIsValid = true;
        for (let inputField in updatedForm) {
            formIsValid = updatedForm[inputField].valid && formIsValid
        }
        
        setForm({fields: updatedForm, isValid: formIsValid});
    }

    const checkFieldValidity = (value: any, type: string) => {
        let isValid: boolean = true;
        if (type === "text") {
            isValid = value.trim() !== '';
        } else if (type === "multipleSelect") {
            isValid = value.length ? true : false;
        }

        return isValid;
    }

    const addSchedule = () => {

    }

    if (!show) {
        return null;
    }

    return (
        <div className={`${localStyles.modal} ${globalStyles.flex} ${globalStyles.flexCenter}`}>
            <section className={localStyles.modalContent} onClick={e => e.stopPropagation()}>
                <header className={`${localStyles.modalHeader} ${globalStyles.flex} ${globalStyles.flexCenterVer} ${globalStyles.flexBetweenHor}`}>
                    <h1 className={`${globalStyles.flex1} ${globalStyles.fontSize3}`}>Schedule</h1>
                    <Button type="button" color="primary" icon="close" label="" action={() => {setForm({...initialForm}); close()}} />
                </header>
                <main className={localStyles.modalBody}>
                    {formFieldArray.map((field: any, i) => (
                        <Input key={field.id} value={field.config.value}
                            index={'scheduler'+i}
                            label={field.config.label} layout={field.config.layout}
                            elementConfig={field.config.elementConfig}
                            elementType={field.config.elementType}
                            options={field.config.options?.length ? field.config.options : undefined}
                            inputChanged={(e) => inputChangedHandler(e, field.id)} />
                    ))}
                </main>
                <footer className={`${localStyles.modalFooter} ${globalStyles.flex} ${globalStyles.flexBetweenHor}`}>
                    <Button type="toggle" color="secondary" label="Temperature unit" toggleLabel={['°F','°C']} />
                    <Button type="button" design="fill" color="primary" label="Add schedule" action={addSchedule} disabled={!form.isValid} />
                </footer>
            </section>
        </div>
    )
}

export default Scheduler;