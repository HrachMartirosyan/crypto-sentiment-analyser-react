import { FC, ReactNode } from "react";
import classnames from "classnames";

import { Grid, Box } from "book-ui";

import styles from "./Auth.layout.module.scss";

type Props = {
  children: ReactNode;
};

export const AuthLayout: FC<Props> = ({ children }) => {
  const classNameVal = classnames(styles.main);

  return (
    <Grid container>
      <Grid md={5} />
      <Grid md={2}>
        <Box className={classNameVal}>{children}</Box>
      </Grid>
    </Grid>
  );
};
