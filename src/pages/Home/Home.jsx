import React, {useCallback} from 'react';
import useUserInfoQuery from "./useUserInfoQuery";
import {Link, useNavigate} from "react-router-dom";

export default () => {
  const {isLoading, data} = useUserInfoQuery();

  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('jwt');
    navigate('/login');
  }, [navigate]);

  return (
    <>
      <div
        className="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      </div>
      <div>
        Hello, <strong>{isLoading ? '-' : data.name}</strong>
      </div>
      <div>
        {data.uid
          ? <a href="#" onClick={logout}>Logout</a>
          : <Link to="login">Login</Link>
        }
      </div>
    </>
  );
};
