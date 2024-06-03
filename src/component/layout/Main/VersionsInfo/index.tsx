import React, { FC } from 'react';
import styles from './VersionsInfo.module.scss';
import pjson from 'src/../package.json';
import { setInfoPopUpAction } from '../../../../redux/actions/loginAction';
import { useAppDispatch } from '../../../../redux/hooks';
import { getApiVersionSelector, getNodeVersionSelector } from 'src/redux/selectors/loginSelector';
import { useSelector } from 'react-redux';
const uiVersion = import.meta.env.VITE_BUILD_VERSION || pjson.version;

const VersionsInfo: FC = () => {
  const dispatch = useAppDispatch();
  const apiVersion = useSelector(getApiVersionSelector);
  const nodeVersion = useSelector(getNodeVersionSelector);
  return (
    <>
      <button
        type="button"
        className={`close ${styles.button}`}
        onClick={() => {
          dispatch(setInfoPopUpAction(false));
        }}
      >
        ×
      </button>
      <div className={styles.text_center}>
        <div className={styles.genesys}></div>
      </div>
      <div className={styles.text_center}>
        <h4>Outbound Contact eXpert</h4>
      </div>
      <h3 style={{ fontWeight: 'initial' }}>Component versions:</h3>
      <ul className={styles.list_default}>
        <li>
          <span className="text-capitalize">UI</span>: <span>{uiVersion}</span>
        </li>
        <li>
          <span className="text-capitalize">API</span>: <span>{apiVersion}</span>
        </li>
        <li>
          <span className="text-capitalize">Node.js</span>: <span>{nodeVersion}</span>
        </li>
      </ul>
    </>
  );
};

export default VersionsInfo;
