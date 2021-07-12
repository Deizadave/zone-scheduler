import localStyles from './Item.module.css';
import globalStyles from '../../../App.module.css';
import Button from '../../Button/Button';

const ScheduleItem = () => {
    const d = new Date;
    const time = d.toLocaleString();

    return (<>
        <li className={`${localStyles.listItem} ${localStyles.listItemGrid} ${localStyles.listItemHot} ${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
            <div className={`${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
                <div className={`${localStyles.temperature} ${globalStyles.flex} ${globalStyles.flexCenter}`}>
                    30.8°
                </div>
                <h3 className={`${localStyles.text} ${globalStyles.fontSize3} ${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    <span className={`${localStyles.textIcon} ${globalStyles.fontSize2} material-icons-round`}>schedule</span>&nbsp;
                    {time}
                </h3>
                <h4 className={`${localStyles.text} ${globalStyles.fontSize3} ${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    <span className={`${localStyles.textIcon} ${globalStyles.fontSize2} material-icons-round`}>pin_drop</span>&nbsp;Meeting Room
                </h4>
            </div>
            <div className={`${localStyles.listItemFooter} ${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
                <Button type="icon" icon="edit" design="outline" color="secondary" label="Edit schedule" action={() => {}} />
                &nbsp;&nbsp;
                <Button type="icon" icon="delete_outline" design="outline" color="danger" label="Delete schedule" action={() => {}} />
            </div>
        </li>
        <li className={`${localStyles.listItem} ${localStyles.listItemGrid} ${localStyles.listItemCold} ${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
            <div className={`${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
                <div className={`${localStyles.temperature} ${globalStyles.flex} ${globalStyles.flexCenter}`}>
                    30.8°
                </div>
                <h3 className={`${localStyles.text} ${globalStyles.fontSize3} ${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    <span className={`${localStyles.textIcon} ${globalStyles.fontSize2} material-icons-round`}>schedule</span>&nbsp;
                    {time}
                </h3>
                <h4 className={`${localStyles.text} ${globalStyles.fontSize3} ${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    <span className={`${localStyles.textIcon} ${globalStyles.fontSize2} material-icons-round`}>pin_drop</span>&nbsp;Meeting Room
                </h4>
            </div>
            <div className={`${localStyles.listItemFooter} ${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
                <Button type="icon" icon="edit" design="outline" color="secondary" label="Edit schedule" action={() => {}} />
                &nbsp;&nbsp;
                <Button type="icon" icon="delete_outline" design="outline" color="danger" label="Delete schedule" action={() => {}} />
            </div>
        </li>
        <li className={`${localStyles.listItem} ${localStyles.listItemGrid} ${localStyles.listItemHot} ${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
            <div className={`${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
                <div className={`${localStyles.temperature} ${globalStyles.flex} ${globalStyles.flexCenter}`}>
                    30.8°
                </div>
                <h3 className={`${localStyles.text} ${globalStyles.fontSize3} ${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    <span className={`${localStyles.textIcon} ${globalStyles.fontSize2} material-icons-round`}>schedule</span>&nbsp;
                    {time}
                </h3>
                <h4 className={`${localStyles.text} ${globalStyles.fontSize3} ${globalStyles.inlineFlex} ${globalStyles.flexCenterVer}`}>
                    <span className={`${localStyles.textIcon} ${globalStyles.fontSize2} material-icons-round`}>pin_drop</span>&nbsp;Meeting Room
                </h4>
            </div>
            <div className={`${localStyles.listItemFooter} ${globalStyles.flex} ${globalStyles.flexCenterVer}`}>
                <Button type="icon" icon="edit" design="outline" color="secondary" label="Edit schedule" action={() => {}} />
                &nbsp;&nbsp;
                <Button type="icon" icon="delete_outline" design="outline" color="danger" label="Delete schedule" action={() => {}} />
            </div>
        </li>
    </>)
}

export default ScheduleItem;