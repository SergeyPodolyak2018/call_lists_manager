import React from 'react';
import styles from './otherLists.module.scss'

import Lists from '../../reusableComponents/Lists';

import { useSelector } from 'react-redux';
import { getPopUpStatus } from 'src/redux/selectors/callingListsSelectors';
import PopUp from 'src/component/reusableComponents/popUp';
import useOtherLists from 'src/hooks/useOtherLists';
import OtherListsToolBar from 'src/component/reusableComponents/OtherListsToolbar';
import { CallingListTreeRootBeta } from 'src/component/reusableComponents/callingLIstTreeBeta';
import Spinner from '@genesys/arkui-react/dist/components/Progress/LoadingSpinner';
import { OtherListPage } from 'src/component/reusableComponents/OtherListsPage';

const OtherList = () => {
  const popUpStatus = useSelector(getPopUpStatus);
  const [listsObjects,loading] = useOtherLists();
  return (
    <>
      {popUpStatus.open && (
        <PopUp
          type={popUpStatus.type}
          code={popUpStatus.code}
          message={popUpStatus.data}
          payload={{ listId: popUpStatus.callingListId, listName: popUpStatus.callingListName }}
        />
      )}
        <Lists>
          {loading? <div className={styles.holder}><Spinner /></div>:
          <>
            <OtherListsToolBar height={40} />
            <OtherListPage data={listsObjects} />
          </>
            
          }
          
        </Lists>
    </>
  );
};

export default OtherList;
