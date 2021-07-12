import React, { Suspense } from 'react';
import Nav from './components/Nav/Nav';
import styles from './App.module.css';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Loading from './components/Loading/Loading';
const SchedulesPage = React.lazy(() => import('./pages/SchedulesPage/SchedulesPage'));

const App = () => {
  return (
    <div className={`${styles.app} ${styles.flex}`}>
      <Suspense fallback={<Loading />}>
        <Nav />
        <main className={styles.appContent}>
          <Switch>
            <Route path="/" exact component={SchedulesPage} />
          </Switch>
        </main>
      </Suspense>
    </div>
  );
}

export default App;
