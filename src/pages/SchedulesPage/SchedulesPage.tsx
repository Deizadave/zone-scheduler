import { useState } from "react";
import Filter from "./components/Filter/Filter";
import Header from "../../components/Header/Header";
import pageStyles from '../Pages.module.css';
import Scheduler from "../../components/Scheduler/Scheduler";

const Schedules = () => {
    const [showScheduler, setShowScheduler] = useState<boolean>(false);

    return (
        <div className={pageStyles.page}>
            <Header title="Schedules" />
            <Filter addSchedule={() => {console.log('sdsd');setShowScheduler(true)}} />
            <Scheduler show={showScheduler} close={() => setShowScheduler(false)} />
        </div>
    )
};

export default Schedules;