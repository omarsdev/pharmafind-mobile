import React, {createContext, useState, useMemo} from 'react';

export const UserDataContext = createContext();

export const UserDataContextProvider = props => {
  const [userData, setUserData] = useState(null);
  const [pharmacistData, setPharmacistData] = useState(null);

  const userDataProviderValue = useMemo(
    () => ({
      userData,
      setUserData,
    }),
    [userData, setUserData],
  );

  const pharmacistDataProviderValue = useMemo(
    () => ({
      pharmacistData,
      setPharmacistData,
    }),
    [pharmacistData, setPharmacistData],
  );

  return (
    <UserDataContext.Provider
      value={{
        userDataProviderValue,
        pharmacistDataProviderValue,
      }}>
      {props.children}
    </UserDataContext.Provider>
  );
};
