import { Box, Typography, Button } from "book-ui";
import styles from "./Error.page.module.scss";
import classnames from "classnames";

export const ErrorPage = () => {
  const classNameVal = classnames(styles.main);

  return (
    <Box className={classNameVal}>
      <Typography variant="h1">Oops</Typography>
      <Typography variant="h4">Something went wrong</Typography>
      <br />
      <Button href="/">Go Home</Button>
    </Box>
  );
};
