export const handlePending = state => {
  state.isLoading = true;
};

export const handleFulfilled = (state) => {
  state.isLoading = false;
  state.error = '';
};

export const handleFulfilledGet = (state, action) => {
  state.contactList = action.payload;
};

export const handleFulfilledCreate = (state, action) => {
  state.contactList.push(action.payload);

};

export const handleFulfilledDelete =  (state, action) => {
  return {
    ...state,
    contactList: state.contactList.filter(
      contact => contact.id !== action.payload
    ),
  };
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
