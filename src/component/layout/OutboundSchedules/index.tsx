import React from 'react';
import './outboundSchedules.scss';
import ResizableContainer from '../../reusableComponents/ResizableContainer';
import Lists from '../../reusableComponents/Lists';
import OutboundSchedulesCreateEdit from '../OutboundSchedulesCreateEdit';
import useLists from '../../../hooks/useSchedules';
import { SchedulesTreeRootBeta } from '../../reusableComponents/schedulesTreeBeta';
import SchedulesToolBar from '../../reusableComponents/SchedulesToolbar';



const OutboundSchedules = () => {

  const [listsObjects] = useLists();

  return (
    <>
      <ResizableContainer initialHeight={300}>
        <Lists>
          <SchedulesToolBar height={40} />
          <SchedulesTreeRootBeta data={listsObjects} />
        </Lists>
        <OutboundSchedulesCreateEdit />
      </ResizableContainer>
    </>
  );
};

export default OutboundSchedules;
