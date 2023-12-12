// import { createContext, useContext, useState } from 'react';

// const MyContext = createContext();

// export const MyContextProvider = ({ children }) => {
//   const [myVariable, setMyVariable] = useState('Initial Value');

//   const myFunction = () => {
//     // Sua lógica de função aqui
//     console.log('Function executed');
//   };

//   return (
//     <MyContext.Provider value={{ myVariable, setMyVariable, myFunction }}>
//       {children}
//     </MyContext.Provider>
//   );
// };

// export const useMyContext = () => {
//   return useContext(MyContext);
// };