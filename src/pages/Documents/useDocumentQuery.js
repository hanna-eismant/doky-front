import {useCallback, useState} from "react";
import {get} from "../../api/request.js";

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const fetch = useCallback(async (id) => {
    setIsLoading(true);
    const data = await get(`documents/${id}`);
    setData(data);
    setIsLoading(false);
    return data;
  }, [setIsLoading, setData]);

  return [ fetch, { data, isLoading } ];
}
