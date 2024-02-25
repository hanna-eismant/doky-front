import {useCallback, useState} from "react";
import {put} from "../../../api/request.js";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const fetch = useCallback(async (formData) => {
    setIsLoading(true);
    const data = await put(`documents/${formData.id}`, formData);
    setData(data);
    setIsLoading(false);
    return data;
  }, [setIsLoading, setData]);

  return [ fetch, { data, isLoading } ];
}
