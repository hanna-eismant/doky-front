import { useEffect, useState } from "react";

export const useQuery = request => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ data, setData ] = useState({});

  useEffect(() => {
    request().then(data => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
};
