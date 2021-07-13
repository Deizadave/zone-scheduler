import { useContext, useEffect, useState } from "react";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import localStyles from '../Pages.module.css';
import Scheduler from "../../components/Scheduler/Scheduler";
import List from "../../components/List/List";
import { AppContext, Actions, Schedule, Zone } from "../../store/Store";
import Loading from "../../components/Loading/Loading";

const ZonesPage = () => {
    const {state, dispatch} = useContext(AppContext);
    const [showScheduler, setShowScheduler] = useState<boolean>(false);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>(undefined);
    const [zone, setZone] = useState<number>(-1);
    const [zoneName, setZoneName] = useState<string>("All zones");

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
        if (Number(zone) === -1) {
            setSchedules(state.schedules);
            setZoneName("All zones");
        } else {            
            setSchedules(state.schedules.filter((s: Schedule) => s.zoneId.toString() === zone.toString()));
            setZoneName(state.zones.find((z: Schedule) => z.id.toString() === zone.toString()).name)
        }        
    }, [state.schedules, zone]);

    const closeScheduler = () => {
        setSelectedSchedule(undefined);
        setShowScheduler(false);
    }

    const editSchedule = (id: number) => {
        setSelectedSchedule(schedules.find(s => s.id === id));
        setShowScheduler(true);
    }

    const deleteSchedule = (id: number) => {
        dispatch({type: Actions.SCHEDULE_Remove, payload: id});
    }
    
    
    return (
        <div className={localStyles.page}>
            <Header title="Zones" />
            {state.zones.length ?
                <>
                    <Filter addSchedule={() => setShowScheduler(true)}
                        display={state.display} changeDisplay={(d) => dispatch({type: Actions.DISPLAY_Set, payload: d})}
                        />
                    <Scheduler show={showScheduler} close={closeScheduler} selectedSchedule={selectedSchedule} />
                    <List data={schedules} type="schedules" display={state.display} title="All zones" />
                </> :
                <Loading message="Fetching zones" />
            }
        </div>
    )
};

export default ZonesPage;