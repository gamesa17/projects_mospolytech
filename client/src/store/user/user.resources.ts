import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Request } from "@common/request";
import { GetMeInput, GetMeResponse } from "@ts/requests";

export const me = createAsyncThunk("me", () =>
  Request.instance.get<GetMeInput, AxiosResponse<GetMeResponse>>("/auth/me").then((response) => response.data)
);
