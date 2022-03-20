const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUsername = state => state.auth.user.name;
const getUserData = state => state.auth.user;
const getUserBalance = state => state.auth.user.balance;
const getIsFetchingCurrent = state => state.auth.isFetchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getUserBalance,
  getIsFetchingCurrent,
  getUserData,
};
export default authSelectors;
