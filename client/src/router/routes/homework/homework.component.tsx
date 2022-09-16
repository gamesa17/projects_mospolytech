import React from "react";
import moment from "moment";
import { Layout } from "antd";
import { StatusCodes } from "http-status-codes";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import { Homework as HomeworkType, HomeworkDto } from "@ts/types";

import { useCommonTranslation, useHomeworkTranslation } from "@localization";

import { Request } from "@common/request";

import { useSelector } from "@client/store";
import { selectCapabilities } from "@client/store/permissions";

import { Header } from "@containers/header";
import { HomeworkModal, HomeworkModalFormValues } from "@containers/homework-modal";
import { HomeworkTable } from "@containers/homework-table";
import { HomeworkCalendar } from "@containers/homework-calendar";

import { Footer } from "@components/footer";
import { Content } from "@components/content";

import { createHomework, deleteHomework, getHomeworks, updateHomework } from "./homework.resources";
import { AddHomeworkButton } from "./homework.styles";

import { HOMEWORKS } from "@client/mock/homeworks";

export const Homework: React.FC = () => {
  const { t } = useHomeworkTranslation();
  const { t: commonT } = useCommonTranslation();

  const { canCreateHomeworkSpecificCourses } = useSelector(selectCapabilities);

  const [isOpen, setIsOpen] = React.useState(false);
  const [modalHomework, setModalHomework] = React.useState<HomeworkDto>();
  const [calendarMode, setCalendarMode] = React.useState<CalendarMode>("month");
  const [calendarDate, setCalendarDate] = React.useState<moment.Moment>(moment());

  const [homeworks, setHomeworks] = React.useState<HomeworkDto[]>([]);

  const isModalEditMode = !!modalHomework;

  React.useEffect(() => {
    if (process.env.USE_MOCKS) {
      Request.mock?.onGet("/homeworks").reply(StatusCodes.OK, Object.values(HOMEWORKS));
    }

    getHomeworks().then(({ data }) => setHomeworks(data));
  }, [t]);

  const handleShowModal = React.useCallback(
    (homeworkId?: number) => {
      setIsOpen(true);

      const homework = homeworks.find((homework) => homework.id === homeworkId);

      if (homework) {
        setModalHomework(homework);
      }
    },
    [homeworks, setIsOpen]
  );

  const handleCloseModal = React.useCallback(() => {
    setIsOpen(false);
    setModalHomework(undefined);
  }, [setIsOpen]);

  const handleCreateHomework = React.useCallback(
    (homework: Omit<HomeworkType, "id" | "createdAt">) =>
      createHomework({ ...homework, createdAt: new Date().toISOString() }).then(({ data: createdHomework }) => {
        setHomeworks((prevHomeworks) => [...prevHomeworks, createdHomework]);
      }),
    []
  );

  const handleEditHomework = React.useCallback(
    (homeworkId: number, updatedHomework: HomeworkType) =>
      updateHomework(homeworkId, updatedHomework).then(({ data: updatedHomework }) => {
        setIsOpen((prevIsOpen) => {
          if (prevIsOpen) {
            setModalHomework(updatedHomework);
          }

          return prevIsOpen;
        });

        setHomeworks((prevHomeworks) =>
          prevHomeworks.map((homework) => (homework.id === updatedHomework.id ? updatedHomework : homework))
        );
      }),
    []
  );

  const handleDeleteHomework = React.useCallback(
    (homeworkId: number) =>
      deleteHomework(homeworkId).then(() =>
        setHomeworks((prevHomeworks) => prevHomeworks.filter((homework) => homework.id !== homeworkId))
      ),
    []
  );

  const handleSubmitHomeworkForm = React.useCallback(
    (values: HomeworkModalFormValues) => {
      if (isModalEditMode) {
        handleEditHomework(modalHomework.id, { ...modalHomework, ...values });
      } else {
        handleCreateHomework({ ...values });
      }
    },
    [modalHomework, isModalEditMode, handleEditHomework, handleCreateHomework]
  );

  console.log(homeworks);

  return (
    <Layout>
      <Header>
        {t("HOMEWORK")}
        {canCreateHomeworkSpecificCourses && (
          <AddHomeworkButton type="primary" onClick={handleShowModal.bind(null, undefined)}>
            {commonT("ADD")}
          </AddHomeworkButton>
        )}
      </Header>
      <Content>
        <HomeworkCalendar
          date={calendarDate}
          homeworks={homeworks}
          calendarMode={calendarMode}
          onDateChange={setCalendarDate}
          onCalendarModeChange={setCalendarMode}
        />
        <HomeworkTable
          calendarDate={calendarDate}
          calendarMode={calendarMode}
          homework={homeworks}
          onEditHomework={handleShowModal}
          onDeleteHomework={handleDeleteHomework}
        />
        <Footer />
        <HomeworkModal
          isOpen={isOpen}
          homework={modalHomework}
          onClose={handleCloseModal}
          onSubmit={handleSubmitHomeworkForm}
        />
      </Content>
    </Layout>
  );
};
