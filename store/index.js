import { createContext, useContext, useMemo, useReducer } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

// Create Context
const MyContext = createContext();
MyContext.displayName = "MyAppContext";

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userLogin: action.value };
    case "LOGOUT":
      return { ...state, userLogin: null };
    default:
      throw new Error("Action not found");
  }
};

// Context Provider Component
const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
    services: [],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  // Memoizing value to avoid unnecessary re-renders
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

// Custom Hook to use Context
const useMyContextController = () => {
    const context = useContext(MyContext);
    if (context === null) {
      throw new Error("useMyContextController must be used within MyContextControllerProvider");
    }
    return context;
  };
  
  // Firestore USERS collection reference
  const USERS = firestore().collection("USERS");
  
  // Login function
  const login = (dispatch, email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        USERS.doc(email).onSnapshot((u) => {
          dispatch({ type: "USER_LOGIN", value: u.data() });
        });
      })
      .catch((e) => Alert.alert("Incorrect email or password"));
  };
  
  // Logout function
  const logout = (dispatch) => {
    auth()
      .signOut()
      .then(() => dispatch({ type: "LOGOUT" }));
  };
  
  export {
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
  };
  
