import classnames from "classnames";
import { Typography } from "book-ui";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={classnames(styles.main)}>
      <Typography>
        Copyright &copy; 2024
        <br />
        <br />
        Except as permitted by the copyright law applicable to you, you may not
        reproduce or communicate any of the content on this website, including
        files downloadable from this website, without the permission of the
        copyright owner.
        <br />
        <br />
        The Australian Copyright Act allows certain uses of content from the
        internet without the copyright owner’s permission. This includes uses by
        educational institutions and by Commonwealth and State governments,
        provided fair compensation is paid. For more information, see
        www.copyright.com.au and www.copyright.org.au.
        <br />
        <br />
        The owners of copyright in the content on this website may receive
        compensation for the use of their content by educational institutions
        and governments, including from licensing schemes managed by Copyright
        Agency.
        <br />
        <br />
        We may change these terms of use from time to time. Check before
        re-using any content from this website.
        <br />
        <br />
        Copyright infringement is a capital crime in Australia
        <br />
        <br />
        All Rights Reserved.
      </Typography>
    </footer>
  );
};
