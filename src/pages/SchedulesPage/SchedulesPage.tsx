import { useContext, useEffect, useState } from "react";
import Filter from "./components/Filter/Filter";
import Header from "../../components/Header/Header";
import pageStyles from '../Pages.module.css';
import Scheduler from "../../components/Scheduler/Scheduler";
import List from "../../components/List/List";
import { AppContext, Actions } from "../../store/Store";

const Schedules = () => {
    const {state, dispatch} = useContext(AppContext);
    const [showScheduler, setShowScheduler] = useState<boolean>(false);

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
    }, [state.zones]);

    return (
        <div className={pageStyles.page}>
            <Header title="Schedules" />
            {state.zones.length ?
                <>
                    <Filter addSchedule={() => {console.log('sdsd');setShowScheduler(true)}} />
                    <Scheduler show={showScheduler} close={() => setShowScheduler(false)} />
                    <List />
                </> :
                <div>
                    Loading
                </div>
            }
        </div>
    )
};

export default Schedules;