import Filter from "./components/Filter/Filter";
import Header from "../../components/Header/Header";
import pageStyles from '../Pages.module.css';

const Schedules = () => {
    return (
        <div className={pageStyles.page}>
            <Header title="Schedules" />
            <Filter />
        </div>
    )
};

export default Schedules;