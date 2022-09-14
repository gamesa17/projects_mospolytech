import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Avatar, Button, List, Popconfirm } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { ShortUserDto } from "@ts/types";

import { useCommonTranslation } from "@localization";

import { selectUser } from "@client/store/user";
import { useSelector } from "@client/store";

import { getFullUserName } from "@common/user";

import { searchStudents } from "./student-info.resources";
import { StudentsSelect } from "./student-info.styles";
import { StudentInfoProps } from "./student-info.types";

export const StudentInfo: React.FC<StudentInfoProps> = ({
  student,
  students,
  setStudents,
  onAddStudent,
  onRemoveStudent,
}) => {
  const { t } = useCommonTranslation();

  const { id } = useSelector(selectUser) || {};

  const title = getFullUserName(student);

  const [selectedStudentId, setSelectedStudentId] = React.useState<number>();
  const [searchResults, setSearchResults] = React.useState<ShortUserDto[]>([]);

  const removeNewStudent = React.useCallback(() => setStudents((prevStudents) => prevStudents.slice(1)), [setStudents]);
  const removeStudentWithId = React.useCallback(() => onRemoveStudent(student.id), [onRemoveStudent, student.id]);

  const selectStudentsOptions = React.useMemo(
    () =>
      searchResults
        .filter((user) => !students.find(({ id: studentId }) => studentId === user.id) && id !== user.id)
        .map(({ id, username, firstName, lastName }) => ({
          value: id,
          label: getFullUserName({ username, firstName, lastName }),
        })),
    [students, id, searchResults]
  );

  const handleAddStudent = React.useCallback(
    () => selectedStudentId && onAddStudent(selectedStudentId),
    [selectedStudentId, onAddStudent]
  );

  const handleSearch = useDebouncedCallback((search: string) => {
    searchStudents(search).then(({ data }) => setSearchResults(data));
  }, 300);

  const handleChangeSelect = React.useCallback((id: unknown) => setSelectedStudentId(Number(id)), []);

  if (student.new) {
    return (
      <List.Item
        actions={[
          <Button
            key="add"
            type="primary"
            disabled={!selectedStudentId}
            icon={<PlusOutlined />}
            onClick={handleAddStudent}
          />,
          <Button key="delete" danger icon={<DeleteOutlined />} onClick={removeNewStudent} />,
        ]}
      >
        <StudentsSelect
          showSearch
          filterOption={false}
          notFoundContent={t("NO_DATA")}
          placeholder={t("SEARCH_A_STUDENT")}
          options={selectStudentsOptions}
          onSearch={handleSearch}
          onChange={handleChangeSelect}
        />
      </List.Item>
    );
  }

  return (
    <List.Item
      actions={[
        <Popconfirm
          key="delete"
          placement="top"
          okText={t("DELETE")}
          cancelText={t("NO")}
          title={t("ARE_YOU_SURE_YOU_WANT_TO_DELETE_STUDENT", {
            name: getFullUserName(student),
          })}
          okButtonProps={{
            danger: true,
          }}
          onConfirm={removeStudentWithId}
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta title={title} avatar={student.avatar && <Avatar src={student.avatar} />} />
    </List.Item>
  );
};
