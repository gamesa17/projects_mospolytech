import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Request } from "@common/request";
import { GetPermissionsInput, GetPermissionsResponse } from "@ts/requests";

export const permissions = createAsyncThunk("permissions", () =>
  Request.instance
    .get<GetPermissionsInput, AxiosResponse<GetPermissionsResponse>>("/permissions")
    .then(({ data, status }) => ({ data, status }))
);
