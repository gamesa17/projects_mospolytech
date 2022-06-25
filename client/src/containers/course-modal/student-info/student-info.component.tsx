import React from "react";
import { Avatar, Button, List } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import { getFullUserName } from "@common/user";

import { StudentsSelect } from "./student-info.styles";
import { StudentInfoProps } from "./student-info.types";

export const StudentInfo: React.FC<StudentInfoProps> = ({ student, setStudents, removeStudent }) => {
  const title = getFullUserName(student);

  const removeNewStudent = React.useCallback(() => setStudents((prev) => prev.slice(1)), [setStudents]);
  const removeStudentWithId = React.useCallback(() => removeStudent(student.id), [removeStudent, student.id]);

  if (student.new) {
    return (
      <List.Item
        actions={[
          <Button key="0" type="primary" icon={<PlusOutlined />} />,
          <Button key="1" danger icon={<DeleteOutlined />} onClick={removeNewStudent} />,
        ]}
      >
        <StudentsSelect showSearch placeholder="Search a student" />
      </List.Item>
    );
  }

  return (
    <List.Item actions={[<Button key={student.id} danger icon={<DeleteOutlined />} onClick={removeStudentWithId} />]}>
      <List.Item.Meta title={title} avatar={student.avatar && <Avatar src={student.avatar} />} />
    </List.Item>
  );
};
