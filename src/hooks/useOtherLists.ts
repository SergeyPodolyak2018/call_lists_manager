import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { isAutorizedSelector } from '../redux/selectors/loginSelector'; 
import { TTableAccessResponse } from 'src/api/ts/interfaces/CallingLists.response';
import restApi from 'src/api/rest';

export default function useOtherLists():[TTableAccessResponse[],boolean] {

  const [lists, setLists] = useState<TTableAccessResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const isAutorized = useSelector(isAutorizedSelector)
  useEffect(() => {
    if (lists.length === 0 && isAutorized) {
      Promise.allSettled([restApi.getDoNotCallingList(), restApi.getRequestLog()]).then((results) =>{
          const newResult:TTableAccessResponse[] = []
          results.forEach((result) => {
            if(result.status==='fulfilled'){
              newResult.push(result.value.data)
            }
          })
          setLists(newResult);
          setLoading(false);
        }
      );
    }
  }, []);

  return [lists, loading];
}