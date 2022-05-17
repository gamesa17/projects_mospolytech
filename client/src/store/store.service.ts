import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user";
import { permissionsReducer } from "./permissions";
import { authorizationReducer } from "./authorization";

export const store = configureStore({
  reducer: {
    user: userReducer,
    permissions: permissionsReducer,
    authorization: authorizationReducer,
  },
});
