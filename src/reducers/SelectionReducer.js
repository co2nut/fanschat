export default (state = null, action) => {
  switch (action.type) {
    case 'select_chat':
      return action.payload;
    default:
      return state;
  }
};
