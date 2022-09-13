import React from "react";
import { Layout } from "antd";
import { StatusCodes } from "http-status-codes";
import { User } from "@ts/types";

import { useCommonTranslation } from "@localization";

import { Request } from "@common/request";

import { useSelector } from "@client/store";
import { selectUser } from "@client/store/user";

import { Header } from "@containers/header";
import { ProfileForm, ProfileFormValues } from "@containers/profile-form";

import { Footer } from "@components/footer";
import { Content } from "@components/content";

import { getUser, updateUser } from "./profile.resources";

import { USERS } from "@client/mock/users";

export const Profile: React.FC = () => {
  const { t } = useCommonTranslation();

  const { id = 0 } = useSelector(selectUser) || {};

  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    if (process.env.USE_MOCKS) {
      Request.mock?.onGet(`/users/${id}profile`).reply(StatusCodes.OK, USERS.Alex);
    }

    getUser(id).then(({ data }) => setUser(data));
  }, [id]);

  const handleFormSubmit = React.useCallback(
    (values: ProfileFormValues) => {
      updateUser(id, values);
    },
    [id]
  );

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <Header>{t("Ваш профиль")}</Header>
      <Content>
        <ProfileForm initialValues={user} onSubmit={handleFormSubmit} />
      </Content>
      <Footer />
    </Layout>
  );
};
