import { AxiosResponse } from "axios";
import { Request } from "@common/request";
import { GetSearchUsersInput, GetSearchUsersResponse } from "@ts/requests";
import { UserRole } from "@ts/enums";

export const searchStudents = (search: string) =>
  Request.instance.get<GetSearchUsersInput, AxiosResponse<GetSearchUsersResponse>>(
    `/users/search?q=${search}&limit=5&role=${UserRole.STUDENT}`
  );
