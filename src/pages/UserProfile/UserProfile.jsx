import React from 'react';
import useUserInfoQuery from "../Home/useUserInfoQuery";

export default () => {
  const {isLoading, data} = useUserInfoQuery();

  return (
      <div className="d-flex align-items-center justify-content-center">
        Hello {isLoading ? '-' : data.uid}
      </div>
  )
}
