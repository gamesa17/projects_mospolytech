import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetMeInput, GetMeResponse } from "@ts/requests";

import { Request } from "@common/request";

export const me = createAsyncThunk("me", () =>
  Request.instance
    .get<GetMeInput, AxiosResponse<GetMeResponse>>("/users/me")
    .then(({ data, status }) => ({ data, status }))
);
