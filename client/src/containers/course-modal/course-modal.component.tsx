import React from "react";
import { StatusCodes } from "http-status-codes";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, List, Modal, Select, Typography } from "antd";

import { UserRole } from "@ts/enums";
import { Language, Level } from "@ts/types";

import { Request } from "@common/request";
import { useCommonTranslation, useCoursesTranslation } from "@localization";

import { StudentInfo } from "./student-info";

import { getLanguages, getLevels } from "./course-model.resources";
import { COURSE_MODAL_CONFIRM_PROPS, COURSE_MODAL_ID } from "./course-modal.constants";
import { ListHeader, LoadMoreButton } from "./course-model.styles";
import { CourseModalProps, StudentExtended } from "./course-modal.types";

import { LEVELS } from "@client/mock/levels";
import { LANGUAGES } from "@client/mock/languages";

export const CourseModal: React.FC<CourseModalProps> = ({ course: { students: courseStudents }, isOpen, onClose }) => {
  const { t } = useCoursesTranslation();
  const { t: commonT } = useCommonTranslation();

  const [levels, setLevels] = React.useState<Level[]>([]);
  const [languages, setLanguages] = React.useState<Language[]>([]);
  const [students, setStudents] = React.useState<StudentExtended[]>([]);

  const maxStudents = courseStudents.length;

  React.useEffect(() => {
    if (process.env.USE_MOCKS) {
      Request.mock
        ?.onGet("/levels")
        .reply(StatusCodes.OK, Object.values(LEVELS))
        .onGet("/languages")
        .reply(StatusCodes.OK, Object.values(LANGUAGES));
    }

    getLevels().then((response) => setLevels(response.data));
    getLanguages().then((response) => setLanguages(response.data));
  }, []);

  const removeStudent = React.useCallback((studentId: number) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
  }, []);

  const addStudent = React.useCallback(
    () =>
      setStudents((prevStudents) => {
        const lastStudent = prevStudents[prevStudents.length - 1];
        const newStudentId = lastStudent ? lastStudent.id + 1 : 0;

        return [{ new: true, username: "", role: UserRole.STUDENT, id: newStudentId }, ...prevStudents];
      }),
    []
  );

  const loadMoreStudents = React.useCallback(() => {
    // TODO: Когда появится backend-возможность постепенно студентов получать, функцию loadMoreStudents надо переписать
  }, []);

  return (
    <Modal
      destroyOnClose
      visible={isOpen}
      title={t("OPEN_COURSE_MODAL_BUTTON")}
      okButtonProps={COURSE_MODAL_CONFIRM_PROPS}
      onCancel={onClose}
    >
      <Form id={COURSE_MODAL_ID} labelCol={{ span: 5 }} wrapperCol={{ span: 20 }}>
        <Form.Item
          label={t("COURSES_MODAL_FIELDS.NAME.LABEL")}
          name="name"
          rules={[
            {
              required: true,
              message: t("COURSES_MODAL_FIELDS.NAME.ERROR"),
            },
          ]}
        >
          <Input placeholder={t("COURSES_MODAL_FIELDS.NAME.PLACEHOLDER")} />
        </Form.Item>
        <Form.Item
          label={t("COURSES_MODAL_FIELDS.LEVEL.LABEL")}
          name="level"
          rules={[
            {
              required: true,
              message: t("COURSES_MODAL_FIELDS.LEVEL.ERROR"),
            },
          ]}
        >
          <Select showSearch placeholder={t("COURSES_MODAL_FIELDS.LEVEL.PLACEHOLDER")} optionFilterProp="children">
            {levels.map(({ name }) => (
              <Select.Option key={name} value={name}>
                {t(`LEVELS.${name.replaceAll(" ", "_").toLocaleUpperCase()}`)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={t("COURSES_MODAL_FIELDS.LANGUAGE.LABEL")}
          name="language"
          rules={[
            {
              required: true,
              message: t("COURSES_MODAL_FIELDS.LANGUAGE.ERROR"),
            },
          ]}
        >
          <Select showSearch placeholder={t("COURSES_MODAL_FIELDS.LANGUAGE.PLACEHOLDER")} optionFilterProp="children">
            {languages.map(({ name }) => (
              <Select.Option key={name} value={name}>
                {t(`LANGUAGES.${name.toLocaleUpperCase()}`)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={students}
        locale={{
          emptyText: commonT("NO_DATA"),
        }}
        header={
          <ListHeader>
            <Typography.Title level={5}>{t("STUDENTS")}</Typography.Title>
            {!students[0]?.new && <Button type="primary" icon={<PlusOutlined />} onClick={addStudent} />}
          </ListHeader>
        }
        loadMore={
          students.length < maxStudents && (
            <LoadMoreButton onClick={loadMoreStudents}>{commonT("SHOW_MORE")}</LoadMoreButton>
          )
        }
        renderItem={(student) => (
          <StudentInfo student={student} removeStudent={removeStudent} setStudents={setStudents} />
        )}
      />
    </Modal>
  );
};
