import { useContext, useEffect, useState } from "react";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import localStyles from '../Pages.module.css';
import Scheduler from "../../components/Scheduler/Scheduler";
import List from "../../components/List/List";
import { AppContext } from '../../store/store';
import { Actions } from '../../store/actions';
import Loading from "../../components/Loading/Loading";

const ZonesPage = () => {
    const {state, dispatch} = useContext(AppContext);
    const [showScheduler, setShowScheduler] = useState<boolean>(false);
    const [selectedZone, setSelectedZone] = useState<number | undefined>(undefined);

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

    const closeScheduler = () => {
        setSelectedZone(undefined);
        setShowScheduler(false);
    }

    const addSchedule = (id: number) => {
        setSelectedZone(id);
        setShowScheduler(true);
    }
    
    return (
        <div className={localStyles.page}>
            <Header title="Zones" />
            {state.zones.length ?
                <>
                    <Filter addSchedule={() => setShowScheduler(true)}
                        display={state.display} changeDisplay={(d) => dispatch({type: Actions.DISPLAY_Set, payload: d})}
                        />
                    <Scheduler show={showScheduler} close={closeScheduler} selectedZone={selectedZone} />
                    <List data={state.zones} type="zones" display={state.display} title="All zones"
                        addSchedule={(id) => addSchedule(id)} />
                </> :
                <Loading message="Fetching zones" />
            }
        </div>
    )
};

export default ZonesPage;