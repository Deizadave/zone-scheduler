import localStyles from './ListItem.module.css';
import globalStyles from '../../../App.module.css';
import Button from '../../Button/Button';

interface Props {
    display: "list" | "grid";
    temperature: number;
    time: string;
    zone: string;
    editItem: () => void;
    deleteItem: () => void;
}

const ScheduleItem = ({display, temperature, time, zone, editItem, deleteItem}: Props) => {
    const t = new Date(time);
    const timeString = t.toLocaleString();

    return (
        <li className={`${localStyles.listItem} ${display === "grid" ? localStyles.listItemGrid : ''}
            ${(temperature > 18) ? localStyles.listItemHot : localStyles.listItemCold} ${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
            <div className={`${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
                <div className={`${localStyles.temperature} ${globalStyles.flex} ${globalStyles.flexCenter}`}>
                    {temperature}°
                </div>
                <h3 className={`${localStyles.text} ${globalStyles.fontSize3} ${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    <span className={`${localStyles.textIcon} ${globalStyles.fontSize2} material-icons-round`}>schedule</span>&nbsp;
                    {timeString}
                </h3>
                <h4 className={`${localStyles.text} ${globalStyles.fontSize3} ${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    <span className={`${localStyles.textIcon} ${globalStyles.fontSize2} material-icons-round`}>pin_drop</span>&nbsp;{zone}
                </h4>
            </div>
            <div className={`${localStyles.listItemFooter} ${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
                <Button type="icon" icon="edit" design="outline" color="secondary" label="Edit schedule" action={editItem} />
                &nbsp;&nbsp;
                <Button type="icon" icon="delete_outline" design="outline" color="danger" label="Delete schedule" action={deleteItem} />
            </div>
        </li>
    )
}

export default ScheduleItem;