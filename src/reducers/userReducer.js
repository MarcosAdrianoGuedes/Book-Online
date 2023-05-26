const initialState = {
    user: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_USER':
      case 'LOGIN_USER':
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  