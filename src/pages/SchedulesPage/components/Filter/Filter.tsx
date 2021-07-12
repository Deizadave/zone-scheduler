import { useState } from "react";
import Button from "../../../../components/Button/Button";
import localStyles from './Filter.module.css';
import globalStyles from '../../../../App.module.css';
import Input from "../../../../components/Input/Input";

interface Props {
    addSchedule: () => void;
}

const Filter = ({addSchedule}: Props) => {
    const [form, setForm] = useState<any>({
        fields: {
            zones: {
                label: 'Zones', elementType: 'select',
                layout: 'inline', value: 'all',
                options: [
                    {value: 'all', text: 'All zones'},
                    {value: 'sd1', text: 'sd1'},
                    {value: 'sd2', text: 'sd2'},
                    {value: 'sd3', text: 'sd3'}
                ],

            },
            view: {
                label: 'View', elementType: 'radio',
                layout: 'inline', value: 'list',
                options: [
                    {value: 'list', icon: 'view_list', text: 'List'},
                    {value: 'grid', icon: 'grid_view', text: 'Grid'},
                ]
            }
        }
    });
    
    const formFieldArray = [];
    for (let key in form.fields) {
        formFieldArray.push({
            id: key,
            config: form.fields[key]
        });
    }

    const inputChangedHandler = (e: any, field: string) => {        
        setForm((prevForm: any) => ({
            ...prevForm,
            fields: {
                ...prevForm.fields,
                [field]: {
                    ...prevForm.fields[field],
                    value: e.target.value
                }
            }
        }))
    }

    return (
        <section className={`${localStyles.filter} ${globalStyles.flex} ${globalStyles.flexCenterVer} ${globalStyles.flexBetweenHor}`}>
            <div className={`${globalStyles.flex} ${globalStyles.flexCenterVer} ${globalStyles.flex1}`}>
                {formFieldArray.map((field: any, i) => (
                    <Input key={field.id} value={field.config.value}
                        index={'filter'+i}
                        label={field.config.label} layout={field.config.layout}
                        elementType={field.config.elementType}
                        options={field.config.options?.length ? field.config.options : undefined}
                        inputChanged={(e) => inputChangedHandler(e, field.id)} />
                ))}
            </div>
            <Button type="button" design="fill" color="primary" label="Add schedule" action={addSchedule} />
        </section>
    );
}

export default Filter;