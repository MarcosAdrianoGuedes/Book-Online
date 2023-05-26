export const createUser = (userData) => {
    return {
      type: 'CREATE_USER',
      payload: userData,
    };
  };
  
  export const loginUser = (userData) => {
    return {
      type: 'LOGIN_USER',
      payload: userData,
    };
  };
