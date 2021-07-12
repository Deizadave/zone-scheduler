import ScheduleItem from './components/ScheduleItem';
import globalStyles from '../../App.module.css';
import localStyles from './List.module.css';

interface Props {
    type: "schedules" | "zones";
    data: any[];
    display: "list" | "grid";
}

const List = ({type, data, display}: Props) => {
    return (
        <section>
            <h2 className={`${localStyles.title} ${globalStyles.fontSize3}`}>All zones schedules</h2>
            <ul className={`${globalStyles.flex} ${localStyles.list} ${display === "grid" ? localStyles.listGrid : ''}`}>
                <ScheduleItem display={display} />
            </ul>
        </section>
    )
}

export default List;