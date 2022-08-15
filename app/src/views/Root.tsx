import { lazy, Suspense, useState } from 'react'
import { HashRouter, useRoutes } from 'react-router-dom'
import APIConfig from './APIConfig';
import reactLogo from './assets/react.svg'
import ErrorBoundary from './Error/ErrorBoundary'
import Loading from './Loading';

const DashBoard = lazy(() => import("./DashBoard/DashBoard"));
const Home = lazy(() => import("./DashBoard/Home"))
const Links = lazy(() => import('./DashBoard/links/LinksPage'));
const Configs = lazy(() => import('./DashBoard/configs/ConfigPage'));
const About = lazy(() => import("./DashBoard/about/AboutPage"));

function App() {
  return useRoutes([
    { path: '/', element: <APIConfig /> },
    {
      path: '/dashboard', element: <DashBoard />,
      children: [
        { path: '', element: <Home /> },
        { path: 'links', element: <Links /> },
        { path: 'configs', element: <Configs /> },
        { path: 'about', element: <About /> }
      ]
    }
  ]);
}

const Root = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </HashRouter>
    </ErrorBoundary>
  )
}

export default Root
