import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';
import { getDataSelector } from '../redux/selectors/schedulesListsSelectors';
import { isAutorizedSelector } from '../redux/selectors/loginSelector'; 
import { getSchedules } from '../redux/actions/scheduleListsActions';

export default function useLists() {
  const listsObjects = useSelector(getDataSelector);
  const dispatch = useAppDispatch();
  const isAutorized = useSelector(isAutorizedSelector)
  useEffect(() => {
    if (listsObjects.length === 0 && isAutorized) {
      dispatch(getSchedules({}));
    }
  }, []);

  return [listsObjects];
}