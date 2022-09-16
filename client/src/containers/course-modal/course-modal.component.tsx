import React from "react";
import { StatusCodes } from "http-status-codes";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, List, Modal, Select, Typography } from "antd";

import { UserRole } from "@ts/enums";
import { Language, Level } from "@ts/types";

import { Request } from "@common/request";
import { useCommonTranslation, useCoursesTranslation } from "@localization";

import { StudentInfo } from "./student-info";

import { getLanguages, getLevels, getStudents } from "./course-model.resources";
import {
  COURSE_MODAL_CONFIRM_PROPS,
  COURSE_MODAL_ID,
  COURSE_MODAL_LOAD_STUDENTS_LIMIT,
} from "./course-modal.constants";
import { ListHeader, LoadMoreButton } from "./course-model.styles";
import { CourseModalFormValues, CourseModalProps, Student } from "./course-modal.types";

import { USERS } from "@client/mock/users";
import { LEVELS } from "@client/mock/levels";
import { COURSES } from "@client/mock/courses";
import { LANGUAGES } from "@client/mock/languages";

export const CourseModal: React.FC<CourseModalProps> = ({ course, isOpen, onClose, onSubmit }) => {
  const { t } = useCoursesTranslation();
  const { t: commonT } = useCommonTranslation();

  const [form] = Form.useForm<CourseModalFormValues>();

  const [levels, setLevels] = React.useState<Level[]>([]);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [languages, setLanguages] = React.useState<Language[]>([]);
  const [studentsSkip, setStudentsSkip] = React.useState<number>(0);
  const [loadedStudents, setLoadedStudents] = React.useState<number>(0);

  const isEditMode = !!course;
  const maxStudents = course?.students.length || 0;

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (process.env.USE_MOCKS) {
      Request.mock
        ?.onGet("/levels")
        .reply(StatusCodes.OK, Object.values(LEVELS))
        .onGet("/languages")
        .reply(StatusCodes.OK, Object.values(LANGUAGES));
    }

    getLevels().then((response) => setLevels(response.data));
    getLanguages().then((response) => setLanguages(response.data));
  }, [isOpen]);

  React.useEffect(() => {
    if (!course) {
      return;
    }

    if (process.env.USE_MOCKS) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentCourse = Object.values(COURSES).find(({ id: courseId }) => courseId === course.id)!;

      const courseStudents = Object.values(USERS).filter(({ id: userId }) => currentCourse.students.includes(userId));

      Request.mock
        ?.onGet(/^\/users/)
        .reply(StatusCodes.OK, courseStudents.slice(0, Math.min(maxStudents, COURSE_MODAL_LOAD_STUDENTS_LIMIT)));
    }

    getStudents(course.id, studentsSkip, COURSE_MODAL_LOAD_STUDENTS_LIMIT).then(({ data }) => {
      setStudents((prevStudents) => [...prevStudents, ...data]);
      setLoadedStudents((prevLoaded) => prevLoaded + data.length);
    });
  }, [course, maxStudents, studentsSkip]);

  React.useEffect(() => {
    form.resetFields();
    setStudents([]);
    setStudentsSkip(0);
    setLoadedStudents(0);
  }, [isOpen, course, form]);

  const loadMoreStudents = React.useCallback(
    () => setStudentsSkip((prevSkip) => prevSkip + COURSE_MODAL_LOAD_STUDENTS_LIMIT),
    []
  );

  const handleAddNewStudent = React.useCallback(
    () =>
      setStudents((prevStudents) => {
        const lastStudent = prevStudents[prevStudents.length - 1];
        const newStudentId = lastStudent ? lastStudent.id + 1 : 0;

        return [{ new: true, username: "", role: UserRole.STUDENT, id: newStudentId, languages: [] }, ...prevStudents];
      }),
    []
  );

  const handleRemoveNewStudent = React.useCallback(
    () => setStudents((prevStudents) => prevStudents.filter((student) => !student.new)),
    []
  );

  const handleRemoveStudent = React.useCallback(
    (deleteStudentId: number) => {
      if (!course) {
        return;
      }

      const newStudent = students.find((student) => student.id === deleteStudentId);

      if (!newStudent) {
        return;
      }

      if (!newStudent.new) {
        const newStudents = course.students.filter((studentId) => studentId !== deleteStudentId);

        onSubmit &&
          onSubmit({
            name: course.name,
            level: course.level.id,
            language: course.language.id,
            students: newStudents,
          });
      }

      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== deleteStudentId));
    },
    [course, students, onSubmit]
  );

  const handleAddStudent = React.useCallback(
    (newStudentId: number) => {
      if (!course) {
        return;
      }

      const newStudents = [...course.students, newStudentId];

      onSubmit &&
        onSubmit({
          name: course.name,
          level: course.level.id,
          language: course.language.id,
          students: newStudents,
        });

      handleRemoveNewStudent();
    },
    [course, onSubmit, handleRemoveNewStudent]
  );

  const handleFinishForm = React.useCallback(
    (values: CourseModalFormValues) => {
      onSubmit && onSubmit({ ...values, students: students.map(({ id }) => id) });
      onClose();
    },
    [students, onSubmit, onClose]
  );

  return (
    <Modal
      visible={isOpen}
      okText={commonT("OK")}
      cancelText={commonT("CANCEL")}
      title={t("COURSE_MODAL_TITLE")}
      okButtonProps={COURSE_MODAL_CONFIRM_PROPS}
      onCancel={onClose}
    >
      <Form
        id={COURSE_MODAL_ID}
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ name: course?.name, level: course?.level.id, language: course?.language.id }}
        onFinish={handleFinishForm}
      >
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
            {levels.map((level) => (
              <Select.Option key={level.id} value={level.id}>
                {t(`LEVELS.${level.name.replaceAll(" ", "_").toLocaleUpperCase()}`)}
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
            {languages.map((language) => (
              <Select.Option key={language.id} value={language.id}>
                {t(`LANGUAGES.${language.name.toLocaleUpperCase()}`)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      {isEditMode && (
        <List
          itemLayout="horizontal"
          dataSource={students}
          locale={{
            emptyText: commonT("NO_DATA"),
          }}
          header={
            <ListHeader>
              <Typography.Title level={5}>{t("STUDENTS")}</Typography.Title>
              {!students[0]?.new && <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNewStudent} />}
            </ListHeader>
          }
          loadMore={
            loadedStudents < maxStudents && (
              <LoadMoreButton onClick={loadMoreStudents}>
                {commonT("SHOW_MORE", { more: maxStudents - loadedStudents })}
              </LoadMoreButton>
            )
          }
          renderItem={(student) => (
            <StudentInfo
              student={student}
              students={students}
              setStudents={setStudents}
              onAddStudent={handleAddStudent}
              onRemoveStudent={handleRemoveStudent}
            />
          )}
        />
      )}
    </Modal>
  );
};
