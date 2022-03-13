import React from "react";
import { Badge } from "antd";
import { getRandomBadgeColor } from "@common/badge";
import { CalendarCellProps } from "./calendar-cell.types";

const CalendarCellRoot: React.FC<CalendarCellProps> = ({ homework }) => (
  <div>
    {homework.map(({ id, name }) => (
      <div key={id}>
        <Badge color={getRandomBadgeColor()} text={name} />
      </div>
    ))}
  </div>
);

export const CalendarCell = React.memo(CalendarCellRoot);
