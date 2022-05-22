import axios from 'axios';
import { useEffect, useState } from 'react';

const useAsyncs = (asyncFunction) => {
  const [datas, setDatas] = useState([] || {});
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    asyncFunction({ cancelToken: source.token })
      .then((res) => {
        if (!unmounted) {
          setDatas(res);
          setErrors('');
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!unmounted) {
          console.log(err.message);
          setErrors(err.message);
          if (axios.isCancel(err)) {
            setErrors(err.message);
            setLoading(false);
            setDatas({});
          } else {
            // console.log('another error happened:' + err.message);
            setErrors(err.message);
            setLoading(false);
            setDatas({});
          }
        }
      });

    return () => {
      (unmounted = true), source.cancel('Cancelled in cleanup');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    datas,
    errors,
    loading,
  };
};

export default useAsyncs;
