import localStyles from './ListItem.module.css';
import globalStyles from '../../../App.module.css';
import { useContext } from 'react';
import { Schedule } from '../../../store/models';
import { AppContext } from '../../../store/store';
import Button from '../../Button/Button';

interface Props {
    display: "list" | "grid";
    id: number;
    name: string;
    addSchedule: () => void;
}

const ZoneItem = ({display, name, id, addSchedule}: Props) => {
    const {state} = useContext(AppContext);
    const schedules: Schedule[] = state.schedules.filter((s: Schedule) => s.zoneId === id);
    const temperatureLimit = state.unit === "°C" ? 15 : 59;

    let temperature = 0;
    schedules.forEach(s => {
        if (s.unit === state.unit) {
            temperature =+ s.temperature;
        } else {
            const temp = (state.unit === "°C") ? (s.temperature - 32) * 5/9 : s.temperature * 9/ 5 + 32;
            temperature =+ temp;
        }
    });
    temperature = temperature/schedules.length;
    
    let itemTheme = localStyles.listItemPlain;
    if (schedules.length) {
        itemTheme = (temperature > temperatureLimit) ? localStyles.listItemHot : localStyles.listItemCold;
    }

    return (
        <li className={`${localStyles.listItem} ${display === "grid" ? localStyles.listItemGrid : ''}
            ${itemTheme} ${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
            <div className={`${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
                <div className={`${localStyles.temperature} ${globalStyles.flex} ${globalStyles.flexColumn} ${globalStyles.flexCenter}`}>
                    {schedules.length ? `${temperature}°` : 'N/A'}
                </div>
                <h3 className={`${localStyles.text} ${globalStyles.fontSize3} ${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    <span className={`${localStyles.textIcon} ${globalStyles.fontSize2} material-icons-round`}>pin_drop</span>&nbsp;{name}
                </h3>
                <h4 className={`${localStyles.text} ${globalStyles.fontSize3} ${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    <span className={`${localStyles.textIcon} ${globalStyles.fontSize2} material-icons-round`}>alarm</span>&nbsp;
                    <b>{schedules.length}</b>&nbsp;schedule{schedules.length > 1 ? 's' : null}
                </h4>
            </div>
            <div className={`${localStyles.listItemFooter} ${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
                <Button type="icon" icon="alarm_add" design="outline" color="primary" label={"Add schedule to "+ name} action={addSchedule} />
            </div>
        </li>
    )
}

export default ZoneItem;