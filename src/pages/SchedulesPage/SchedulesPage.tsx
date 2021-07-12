import { useContext, useEffect, useState } from "react";
import Filter from "./components/Filter/Filter";
import Header from "../../components/Header/Header";
import pageStyles from '../Pages.module.css';
import Scheduler from "../../components/Scheduler/Scheduler";
import List from "../../components/List/List";
import { AppContext, Actions, Schedule } from "../../store/Store";
import Loading from "../../components/Loading/Loading";

const Schedules = () => {
    const {state, dispatch} = useContext(AppContext);
    const [showScheduler, setShowScheduler] = useState<boolean>(false);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [zone, setZone] = useState<string>("all");

    useEffect(() => {
        if (!state.zones.length) {
            const url = "https://my-json-server.typicode.com/ivanturianytsia-envio/json-data/zones";
            fetch(url).then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response      
            }).then((zones) => {
                dispatch({type: Actions.ZONES_Set, payload: zones});
            }).catch(() => {

            });
        }
    }, [state.zones, dispatch]);

    useEffect(() => {
        let schedules = state.schedules;
        if (zone !== "all") {
            schedules.filter((s: Schedule) => s.zone === zone)
        }
        setSchedules(schedules);
    }, [state.schedules, zone]);
    
    return (
        <div className={pageStyles.page}>
            <Header title="Schedules" />
            {state.zones.length ?
                <>
                    <Filter zone={zone} changeZone={(z) => setZone(z)}
                        display={state.display} changeDisplay={(d) => dispatch({type: Actions.DISPLAY_Set, payload: d})}
                        addSchedule={() => setShowScheduler(true)} />
                    <Scheduler show={showScheduler} close={() => setShowScheduler(false)} />
                    <List data={schedules} type="schedules" display={state.display} />
                </> :
                <Loading message="Fetching zones" />
            }
        </div>
    )
};

export default Schedules;