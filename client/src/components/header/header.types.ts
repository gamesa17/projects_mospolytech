import React from "react";

export type HeaderProps = React.PropsWithChildren<{
  onLogout?(): void;
}>;
