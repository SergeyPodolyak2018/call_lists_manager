import React from 'react';
import './callingList.scss';
import ResizableContainer from '../../reusableComponents/ResizableContainer';
import Lists from '../../reusableComponents/Lists';
import { useSelector } from 'react-redux';
import { getPopUpStatus } from 'src/redux/selectors/callingListsSelectors';
import PopUp from 'src/component/reusableComponents/popUp';
import ListDataBeta from 'src/component/reusableComponents/ListDataBeta';
import { CallingListTreeRootBeta } from 'src/component/reusableComponents/callingLIstTreeBeta';
import ListsToolBar from 'src/component/reusableComponents/ListsToolbar';
import useLists from 'src/hooks/useLists';

const CallingList = () => {
  const popUpStatus = useSelector(getPopUpStatus);
  const [listsObjects] = useLists();
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
      <ResizableContainer initialHeight={300}>
        <Lists>
          <ListsToolBar height={40} />
          <CallingListTreeRootBeta data={listsObjects} />
        </Lists>
        <ListDataBeta />
      </ResizableContainer>
    </>
  );
};

export default CallingList;
