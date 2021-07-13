import { useContext } from "react";
import Button from "../Button/Button";
import localStyles from './Filter.module.css';
import globalStyles from '../../App.module.css';
import Input from "../Input/Input";
import { AppContext } from "../../store/store";


interface Props {
    addSchedule: () => void;
    zone?: number;
    changeZone?: (args: number) => void;
    display?: string;
    changeDisplay?: (args: "list" | "grid") => void;
}

const Filter = ({addSchedule, zone, changeZone, changeDisplay}: Props) => {
    const {state} = useContext<any>(AppContext);

    const inputChangedHandler = (e: any, field: "zone" | "display") => {        
        if (field === "zone" && changeZone) {
            changeZone(e.target.value);
        } else if (field === "display" && changeDisplay) {
            changeDisplay(e.target.value);
        }
    }
    
    const zonesList = [
        {value: -1, text: 'All zones'},
        ...state.zones.map((z: any) => ({
            value: z.id, text: z.name
        }))
    ]

    return (
        <section className={`${localStyles.filter} ${globalStyles.flex} ${globalStyles.flexCenterVer} ${globalStyles.flexBetweenHor}`}>
            <div className={`${globalStyles.flex} ${globalStyles.flexCenterVer} ${globalStyles.flex1}`}>
                {(zone && changeZone) ? 
                    <Input value={zone}
                            index="filterZones"
                            label="Zones" layout="inline"
                            elementType="select"
                            options={zonesList}
                            inputChanged={(e) => inputChangedHandler(e, "zone")} />
                : null}
                <span className={globalStyles.hiddenSm}>
                    {(state.display && changeDisplay) ? 
                        <Input value={state.display}
                                index="filterDiplay"
                                label="Display" layout="inline"
                                elementType="radio"
                                options={[
                                    {value: 'list', icon: 'view_list', text: 'List'},
                                    {value: 'grid', icon: 'grid_view', text: 'Grid'},
                                ]}
                                inputChanged={(e) => inputChangedHandler(e, "display")} />
                    : null}
                </span>
            </div>
            <span className={globalStyles.hiddenSm}>
                <Button type="button" design="fill" color="primary" label="Add schedule" action={addSchedule} />
            </span>
            <span className={globalStyles.visibleSm}>
                <Button type="fab" design="fill" icon="alarm_add" color="primary" label="Add schedule" action={addSchedule} />
            </span>
        </section>
    );
}

export default Filter;