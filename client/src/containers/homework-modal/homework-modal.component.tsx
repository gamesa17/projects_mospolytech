import React from "react";
import moment from "moment";
import { StatusCodes } from "http-status-codes";
import { DatePicker, Form, Input, Modal, Select } from "antd";

import { CourseDto } from "@ts/types";

import { Request } from "@common/request";
import { useCommonTranslation, useHomeworkTranslation } from "@localization";

import { getCourses } from "./homework-model.resources";
import { HOMEWORK_MODAL_CONFIRM_PROPS, HOMEWORK_MODAL_ID } from "./homework-modal.constants";
import { HomeworkModalFormValues, HomeworkModalProps } from "./homework-modal.types";

import { COURSES } from "@client/mock/courses";

export const HomeworkModal: React.FC<HomeworkModalProps> = ({ homework, isOpen, onClose, onSubmit }) => {
  const { t } = useHomeworkTranslation();
  const { t: commonT } = useCommonTranslation();

  const [form] = Form.useForm<HomeworkModalFormValues>();

  const [courses, setCourses] = React.useState<CourseDto[]>([]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (process.env.USE_MOCKS) {
      Request.mock?.onGet("/courses").reply(StatusCodes.OK, Object.values(COURSES));
    }

    getCourses().then(({ data }) => setCourses(data));
  }, [isOpen, homework]);

  React.useEffect(() => {
    form.resetFields();
    setCourses([]);
  }, [isOpen, homework, form]);

  const handleFinishForm = React.useCallback(
    (values: HomeworkModalFormValues) => {
      onSubmit && onSubmit({ ...values, deadlineAt: (values.deadlineAt as unknown as moment.Moment).toISOString() });
      onClose();
    },
    [onSubmit, onClose]
  );

  return (
    <Modal
      visible={isOpen}
      okText={commonT("OK")}
      cancelText={commonT("CANCEL")}
      title={t("HOMEWORK_MODAL_TITLE")}
      okButtonProps={HOMEWORK_MODAL_CONFIRM_PROPS}
      onCancel={onClose}
    >
      <Form
        id={HOMEWORK_MODAL_ID}
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          name: homework?.name,
          description: homework?.description,
          link: homework?.link,
          course: homework?.course.id,
          deadlineAt: homework ? moment(homework?.deadlineAt) : undefined,
        }}
        onFinish={handleFinishForm}
      >
        <Form.Item
          name="name"
          label={t("HOMEWORK_MODAL_FIELDS.NAME.LABEL")}
          rules={[
            {
              required: true,
              message: t("HOMEWORK_MODAL_FIELDS.NAME.ERROR"),
            },
          ]}
        >
          <Input placeholder={t("HOMEWORK_MODAL_FIELDS.NAME.PLACEHOLDER")} />
        </Form.Item>
        <Form.Item
          name="course"
          label={t("HOMEWORK_MODAL_FIELDS.COURSE.LABEL")}
          rules={[
            {
              required: true,
              message: t("HOMEWORK_MODAL_FIELDS.COURSE.ERROR"),
            },
          ]}
        >
          <Select showSearch placeholder={t("HOMEWORK_MODAL_FIELDS.COURSE.PLACEHOLDER")} optionFilterProp="children">
            {courses.map((course) => (
              <Select.Option key={course.id} value={course.id}>
                {course.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="deadlineAt"
          label={t("HOMEWORK_MODAL_FIELDS.DEADLINE.LABEL")}
          rules={[
            {
              required: true,
              message: t("HOMEWORK_MODAL_FIELDS.DEADLINE.ERROR"),
            },
          ]}
        >
          <DatePicker showTime placeholder={t("HOMEWORK_MODAL_FIELDS.DEADLINE.PLACEHOLDER")} />
        </Form.Item>
        <Form.Item name="description" label={t("HOMEWORK_MODAL_FIELDS.DESCRIPTION.LABEL")}>
          <Input multiple placeholder={t("HOMEWORK_MODAL_FIELDS.DESCRIPTION.PLACEHOLDER")} />
        </Form.Item>
        <Form.Item
          name="link"
          label={t("HOMEWORK_MODAL_FIELDS.LINK.LABEL")}
          rules={[
            {
              pattern:
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
              message: "Error",
            },
          ]}
        >
          <Input placeholder={t("HOMEWORK_MODAL_FIELDS.LINK.PLACEHOLDER")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
