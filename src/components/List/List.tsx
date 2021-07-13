import ScheduleItem from './components/ScheduleItem';
import globalStyles from '../../App.module.css';
import localStyles from './List.module.css';
import { Schedule } from '../../store/Store';

interface Props {
    type: "schedules" | "zones";
    data: Schedule[];
    display: "list" | "grid";
}

const List = ({type, data, display}: Props) => {
    
    return (
        
        <section>
            <h2 className={`${localStyles.title} ${globalStyles.fontSize3}`}>All zones schedules ({data.length})</h2>
            {data.length ?
                <ul className={`${globalStyles.flex} ${localStyles.list} ${display === "grid" ? localStyles.listGrid : ''}`}>
                    {data.map(item => (
                        <ScheduleItem key={item.id} display={display}
                            temperature={item.temperature} zone={item.zone} time={item.time} />
                     ))}
                </ul> :
                <div className={`${globalStyles.flex} ${globalStyles.flexCenter} ${globalStyles.flexColumn} ${localStyles.emptyList}`}>
                    <h3 className={`${localStyles.emptyText} ${globalStyles.fontSize4}`}>OOPS! Nothing found.</h3>
                    <h4 className={`${localStyles.emptyText} ${globalStyles.fontSize1}`}>Please add a new item or refresh.</h4>
                </div>
            }
        </section>
    )
}

export default List;