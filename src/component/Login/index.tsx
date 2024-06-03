import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';
import styled from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';
import { H1 } from '@genesys/arkui-react/dist/components/typography';
import Spinner from '@genesys/arkui-react/dist/components/Progress/LoadingSpinner';
import { isErrorSelector, isLoadingSelector } from '../../redux/selectors/loginSelector';
import { loginAction, userInfoAction, loginErrordAction } from '../../redux/actions/loginAction';
import { useAppDispatch } from '../../redux/hooks';
import useStateRef from 'react-usestateref';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);
  const [username, setUsername, usernameRef] = useStateRef('');
  const [password, setPassword, passwordRef] = useStateRef('');
  const [required,setRequired] = useState(false);
  const dispatch = useAppDispatch();

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if(usernameRef.current!==''){
      dispatch(loginAction({ username: usernameRef.current, password: passwordRef.current }));
    }
  };
  useEffect(() => {
    dispatch(userInfoAction());
  }, []);

  const confirmError = () => {
    dispatch(loginErrordAction(false));
  };
  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.value===''){
      setRequired(true);
    }else{
      setRequired(false);
    }
    setUsername(e.target.value);
  }

  return (
    <MainContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.loginWrapper}>
          <div className={styles.imageContainer}>
            <img alt="Loading..." src={'/customer/ui/generic.png'} />
          </div>
          <Container>
            <div className={styles.arcLogin}>
              <div className={styles.arcLogin_wrapper}>
                <div className={styles.branding}>
                  <img alt="Genesys" src={'/customer/ui/genesys-logo.png'} />
                </div>

                <H1 style={{ fontWeight: '500' }}>{t('product')}</H1>
                <div
                  className={`g-panel-message g-widget g-message g-message-closable g-message-error ${
                    styles.errorMessage
                  } ${isError ? styles.show : styles.hide}`}
                >
                  <div className="g-message-icon ui-icon icon-24 g-icon-alternative icon-stop-circle"></div>
                  <div className="g-message-text">{t('cant_login')}</div>
                  <div
                    className="g-message-close ui-icon icon-16 icon-closelarge g-icon-alternative"
                    onClick={confirmError}
                  ></div>
                </div>
                <form onSubmit={handleOnSubmit}>
                  <div className={`input-container tenant-container form-group ${styles.inputContainer}`}>
                    <label className="input-label" htmlFor="username">
                      {t('username')}
                    </label>
                    <input
                      className="form-control right-icon"
                      id="username"
                      name="tenant"
                      autoComplete="off"
                      data-placeholder="Username"
                      placeholder="Username"
                      onChange={changeUsername}
                    />
                    {required && <span className={`fonticon icon-stop ${styles.mandatory}`}> <i>This field is mandatory.</i></span>}
                  </div>
                  <div className={`input-container tenant-container form-group ${styles.inputContainer}`}>
                    <label className="input-label" htmlFor="password" data-i18n="[html]tenant">
                      {t('password')}
                    </label>
                    <input
                      type="password"
                      className="form-control right-icon"
                      id="password"
                      name="password"
                      autoComplete="off"
                      data-placeholder="Password"
                      placeholder="Password"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="ark-continue-button">
                    <button className={`btn btn-primary btn-block ${styles.loginButton}`} onClick={handleOnSubmit}>
                      {t('log_in')}
                    </button>
                  </div>
                  <input type="submit" style={{ display: 'none' }} />
                </form>
              </div>
            </div>
          </Container>
        </div>
      )}
    </MainContainer>
  );
};

const Container = styled.div`
  height: 100%;
  background-color: #fdfdfd;
  border-left: 1px solid #dae1e8;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Login;
