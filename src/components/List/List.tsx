import ScheduleItem from './components/ScheduleItem';
import globalStyles from '../../App.module.css';
import localStyles from './List.module.css';
import { Schedule, Zone } from '../../store/Store';

interface Props {
    type: "schedules" | "zones";
    data: any[];
    display: "list" | "grid";
    editItem: (id: number) => void;
    deleteItem: (id: number) => void;
}

const List = ({type, data, display, editItem, deleteItem}: Props) => {
    
    return (
        
        <section>
            <h2 className={`${localStyles.title} ${globalStyles.fontSize3}`}>All zones schedules ({data.length})</h2>
            {data.length ?
                <ul className={`${globalStyles.flex} ${localStyles.list} ${display === "grid" ? localStyles.listGrid : ''}`}>
                    {type === "schedules" ?
                        data.map((item: Schedule) => (
                            <ScheduleItem key={item.id} display={display}
                                temperature={item.temperature} zone={item.zone} time={item.time}
                                editItem={() => editItem(item.id)} deleteItem={() => deleteItem(item.id)} />
                         )) :
                         data.map((item: Zone) => (
                            <div>
                                item
                            </div>
                         ))
                     }
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