import { CourseDto } from "@ts/types";

export type CourseCardProps = CourseDto & {
  canEdit: boolean;
  canDelete: boolean;
  canAddMembers: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onPhotoLoad?: () => void;
};
