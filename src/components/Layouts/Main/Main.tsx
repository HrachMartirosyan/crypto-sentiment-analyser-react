import { Grid, Box, Button, ButtonGroup } from "book-ui";
import classnames from "classnames";

import styles from "./Main.module.scss";

import { FC, ReactNode, useCallback } from "react";
import { useUserLogoutMutation } from "../../../tanstack";
import { Footer } from "../../DataDisplay";

type Props = {
  children: ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
  const classNameVal = classnames(styles.main);
  const userLogout = useUserLogoutMutation();

  const onLogout = useCallback(() => {
    userLogout.mutate();
  }, [userLogout]);

  return (
    <Grid container spacing="sm" className={classNameVal}>
      <Grid item md={2} sm={12} xs={12}>
        <Box className={classnames(styles.sidebar)}>
          <ButtonGroup orientation="vertical">
            <Button href="/" className={classnames(styles.button)}>
              Analytics
            </Button>
            <Button href="/information" className={classnames(styles.button)}>
              Information
            </Button>
            <Button href="/about" className={classnames(styles.button)}>
              About
            </Button>
          </ButtonGroup>
          <Button variant="text" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Grid>
      <Grid item md={10} sm={12} xs={12}>
        <Box className={classnames(styles.content)}>
          <Box>{children}</Box>
          <Footer />
        </Box>
      </Grid>
    </Grid>
  );
};
