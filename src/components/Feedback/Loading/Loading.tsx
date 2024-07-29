import { Box, Icons } from "book-ui";
import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <Box className={styles.main}>
      <Icons.Loading width="50px" height="50px" />
    </Box>
  );
};
