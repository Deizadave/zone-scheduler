import ScheduleItem from './components/ScheduleItem';
import globalStyles from '../../App.module.css';
import localStyles from './List.module.css';

const List = () => {
    return (
        <section>
            <h2 className={`${localStyles.title} ${globalStyles.fontSize3}`}>All zones schedules</h2>
            <ul className={`${globalStyles.flex} ${localStyles.list}  ${localStyles.listGrid}`}>
                <ScheduleItem />
            </ul>
        </section>
    )
}

export default List;