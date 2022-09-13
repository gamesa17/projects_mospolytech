import React from "react";
import { Badge } from "antd";
import { getRandomBadgeColor } from "@common/badge";
import { CalendarCellProps } from "./calendar-cell.types";

const CalendarCellRoot: React.FC<CalendarCellProps> = ({ homework }) => {
  const [color, setColor] = React.useState<string>("");

  React.useEffect(() => {
    setColor(getRandomBadgeColor());
  }, []);

  return (
    <div>
      {homework
        .sort((hw1, hw2) => +new Date(hw1.deadline) - +new Date(hw2.deadline))
        .map(({ id, name }) => (
          <div key={id}>
            {/* TODO: Сделать цвет дз серым, если оно выполнено(только для ученика) */}
            <Badge color={color} text={name} />
          </div>
        ))}
    </div>
  );
};

export const CalendarCell = React.memo(CalendarCellRoot);
