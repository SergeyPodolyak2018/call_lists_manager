import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate, BrowserRouter, useLocation } from 'react-router-dom';
import { MainPath, allPaths } from './constants/path';
import { useSelector } from 'react-redux';
import './App.scss';
import { isAutorizedSelector } from './redux/selectors/loginSelector';
import Login from './component/Login';
import NotFound from './component/NotFound';
import Main from './component/layout/Main';
import Campaigns from './component/layout/Campaigns';
import CallingList from './component/layout/CallingList';
import DialingSession from './component/layout/DialingSession';
import './i18n';
import { ToastProvider } from './component/ToastProvider';
import OtherList from './component/layout/OtherList';
import OutboundSchedules from './component/layout/OutboundSchedules';
import { webSocketManager } from './utils/webSocketNotify';

type TProtectedRouteProps = {
  autorized: boolean;
  children: any;
};

const ProtectedRoute = (props: TProtectedRouteProps) => {
  if (!props.autorized) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
};

function App() {
  const navigate = useNavigate();
  const isAutorized = useSelector(isAutorizedSelector);
  const location = useLocation();

  const isValidPath = (value: string) => {
    const substring = '/customer/ui/';
    const index = value.indexOf(substring);
    if (index !== -1) {
      const substringAfter = value.substring(index + substring.length);
      return Object.values(allPaths).includes(substringAfter as allPaths);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('login')) return;
    if (isValidPath(location.pathname)) {
      localStorage.setItem('currentPath', location.pathname);
    }
  }, [location.pathname]);

  window.addEventListener('unload', () => {
    webSocketManager.disconnectWebSocket();
  });

  useEffect(() => {
    if (!isAutorized) {
      navigate(`${MainPath}/${allPaths['login']}`);
    }
    if (isAutorized) {
      const savedPath = localStorage.getItem('currentPath');

      if (savedPath && !savedPath.includes('login')) {
        navigate(`${savedPath}`);
      } else {
        navigate(`${MainPath}/${allPaths['campaigns']}`);
      }
    }
  }, [isAutorized]);

  return (
    <ToastProvider>
      <Main>
        <Routes>
          <Route path={`${MainPath}/${allPaths['login']}`} element={<Login />} />
          <Route
            path={`${MainPath}/${allPaths['campaigns']}`}
            element={
              <ProtectedRoute autorized={isAutorized}>
                <Campaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${MainPath}/${allPaths['dialingSession']}`}
            element={<ProtectedRoute autorized={isAutorized}>{isAutorized && <DialingSession />}</ProtectedRoute>}
          />
          <Route
            path={`${MainPath}/${allPaths['callingLists']}`}
            element={<ProtectedRoute autorized={isAutorized}>{isAutorized && <CallingList />}</ProtectedRoute>}
          />
          <Route
            path={`${MainPath}/${allPaths['outboundSchedules']}`}
            element={<ProtectedRoute autorized={isAutorized}>{isAutorized && <OutboundSchedules />}</ProtectedRoute>}
          />
          <Route
            path={`${MainPath}/${allPaths['contactLists']}`}
            element={<ProtectedRoute autorized={isAutorized}>contact lists</ProtectedRoute>}
          />
          <Route
            path={`${MainPath}/${allPaths['other']}`}
            element={<ProtectedRoute autorized={isAutorized}>{isAutorized && <OtherList />}</ProtectedRoute>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </ToastProvider>
  );
}

export default App;
