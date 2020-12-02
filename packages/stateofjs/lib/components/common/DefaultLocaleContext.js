import React, { useContext } from 'react';

const DefaultLocaleContext = React.createContext();

export const useDefaultLocaleContext = () => useContext(DefaultLocaleContext)

export default DefaultLocaleContext;