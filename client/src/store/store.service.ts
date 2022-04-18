import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user";
import { authorizationReducer } from "./authorization";

export const store = configureStore({
  reducer: {
    user: userReducer,
    authorization: authorizationReducer,
  },
});
