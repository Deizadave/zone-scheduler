import ScheduleItem from './components/ScheduleItem';
import globalStyles from '../../App.module.css';
import localStyles from './List.module.css';
import { AppContext, Schedule, Zone } from '../../store/Store';
import { useContext } from 'react';

interface Props {
    type: "schedules" | "zones";
    data: any[];
    display: "list" | "grid";
    editItem?: (id: number) => void;
    deleteItem?: (id: number) => void;
    title?: string;
}

const List = ({type, data, display, editItem, deleteItem, title = "List"}: Props) => {
    const {state} = useContext(AppContext);
    
    return (
        
        <section>
            <h2 className={`${localStyles.title} ${globalStyles.fontSize3}`}>{title} ({data.length})</h2>
            {data.length ?
                <ul className={`${globalStyles.flex} ${localStyles.list} ${display === "grid" ? localStyles.listGrid : ''}`}>
                    {type === "schedules" ?
                        data.map((item: Schedule) => {
                            let temperature = item.temperature;
                            if (item.unit !== state.unit) {
                                temperature = (state.unit === "°C") ? (item.temperature - 32) * 5/9 : item.temperature * 9/ 5 + 32;
                            }
                            temperature = Math.round(temperature * 10)/10;
                            return (
                                <ScheduleItem key={item.id} display={display}
                                    temperature={temperature} zone={item.zone} time={item.time}
                                    editItem={() => editItem ? editItem(item.id) : null}
                                    deleteItem={() => deleteItem ? deleteItem(item.id) : null} />
                            )
                        }) :
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