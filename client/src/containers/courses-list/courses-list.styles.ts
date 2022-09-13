import styled from "styled-components";

export const CoursesListWrapper = styled.div({
  padding: "25px 25px 0",

  display: "flex",
  flexWrap: "wrap",
  gap: 30,
});

export const CoursesListSkeletonWrapper = styled(CoursesListWrapper)(({ theme }) => ({
  alignItems: "flex-start",

  background: theme.colorPalette.white,

  position: "absolute",
  zIndex: 1,
  inset: 0,
}));
