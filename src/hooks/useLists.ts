import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';
import { getDataSelector } from '../redux/selectors/callingListsSelectors';
import { isAutorizedSelector } from '../redux/selectors/loginSelector'; 
import { getCallingListsObjects, getCallingListsTotal } from '../redux/actions/callingLitssActions';

export default function useLists() {
  const listsObjects = useSelector(getDataSelector);
  const dispatch = useAppDispatch();
  const isAutorized = useSelector(isAutorizedSelector)
  useEffect(() => {
    if (listsObjects.length === 0 && isAutorized) {
      dispatch(getCallingListsObjects({}));
      dispatch(getCallingListsTotal());
    }
  }, []);

  return [listsObjects];
}