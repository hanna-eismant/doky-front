import React from 'react';
import useUserInfoQuery from "../Home/useUserInfoQuery";
import EditUserProfileForm from "./EditUserProfileForm";

export default () => {
  const {isLoading, data} = useUserInfoQuery();

  return (
    <>
      <div
        className="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">
          <span className="align-middle">Your Profile</span>
        </h1>
      </div>
      <div>
        {!isLoading && <EditUserProfileForm document={data}/>}
      </div>
    </>
  )
}
