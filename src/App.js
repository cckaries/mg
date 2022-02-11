import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import Header from './components/shared/Header/Header';
import CatalogPage from './pages/catalog';

function App() {
  return (
    <div className={styles.Container}>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<CatalogPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
