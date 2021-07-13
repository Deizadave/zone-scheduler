import { useContext, useEffect, useState } from 'react';
import localStyles from './Scheduler.module.css';
import globalStyles from '../../App.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Schedule } from '../../store/models';
import { AppContext } from '../../store/store';
import { Actions } from '../../store/actions';

interface Props {
    show: boolean;
    close: () => void;
    selectedSchedule?: Schedule;
    selectedZone?: number;
}

const Scheduler = ({show, close, selectedSchedule, selectedZone}: Props) => {
    const {state, dispatch} = useContext(AppContext);
    const zonesList = [
        ...state.zones.map((z: any) => ({
            value: z.id, text: z.name
        }))
    ]
    const initialForm = {
        fields: {
            zones: {
                label: 'Zones', elementType: 'multipleSelect',
                layout: 'block', value: [],
                options: zonesList, valid: false
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

    useEffect(() => {
        if (selectedSchedule) {
            setForm((prevForm: any) => ({
                ...prevForm,
                fields: {
                    ...prevForm.fields,
                    zones: {
                        ...prevForm.fields.zones,
                        value: [selectedSchedule.zoneId],
                        elementConfig: {disabled: true},
                        valid: true
                    },
                    temperature: {
                        ...prevForm.fields.temperature,
                        value: selectedSchedule.temperature,
                        valid: true
                    },
                    time: {
                        ...prevForm.fields.time,
                        value: selectedSchedule.time,
                        valid: true
                    }
                }
            }))
        }
    }, [selectedSchedule]);

    useEffect(() => {
        if (selectedZone) {
            setForm((prevForm: any) => ({
                ...prevForm,
                fields: {
                    ...prevForm.fields,
                    zones: {
                        ...prevForm.fields.zones,
                        value: [selectedZone],
                        valid: true
                    }
                }
            }))
        }
    }, [selectedZone])
    
    const formFieldArray = [];
    for (let key in form.fields) {
        formFieldArray.push({
            id: key,
            config: form.fields[key]
        });
    }

    const inputChangedHandler = (e: any, field: string) => {
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
            formIsValid = updatedForm[inputField].valid && formIsValid;            
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
        if (selectedSchedule) {            
            const updatedSchedule = {
                ...selectedSchedule,
                temperature: form.fields.temperature.value,
                time: form.fields.time.value
            };
            dispatch({type: Actions.SCHEDULE_Update, payload: updatedSchedule});
        } else {
            const selectedZones = form.fields.zones.value;
            const newSchedules: Schedule[] = selectedZones.map((z: number, i: number) => {
                const zone = state.zones.find((zone: Schedule) => zone.id.toString() === z.toString());
                return ({
                    id: Date.now()+i,
                    zone: zone.name,
                    zoneId: Number(z),
                    temperature: form.fields.temperature.value,
                    unit: state.unit,
                    time: form.fields.time.value
                })
            });
            dispatch({type: Actions.SCHEDULE_Add, payload: newSchedules});
        }
        closeScheduler();
    }

    const closeScheduler = () => {
        setForm({...initialForm});
        close();
    }

    if (!show) {
        return null;
    }

    return (
        <div className={`${localStyles.modal} ${globalStyles.flex} ${globalStyles.flexCenterHor}`}>
            <form className={localStyles.modalContent} onClick={e => e.stopPropagation()}>
                <header className={`${localStyles.modalHeader} ${globalStyles.flex} ${globalStyles.flexCenterVer} ${globalStyles.flexBetweenHor}`}>
                    <h1 className={`${globalStyles.flex1} ${globalStyles.fontSize3}`}>Schedule</h1>
                    <Button type="icon" color="primary" design="outline" icon="close" label="" action={closeScheduler} />
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
                    <Button type="toggle" color="secondary" label="Temperature unit" toggleLabel={['°F','°C']}
                        activeLabel={state.unit} action={() => dispatch({type: Actions.UNIT_Toggle, payload: state.unit === '°F' ? '°C' : '°F'})} />
                    <Button type="button" design="fill" color="primary" label="Save" action={addSchedule} disabled={!form.isValid} />
                </footer>
            </form>
        </div>
    )
}

export default Scheduler;