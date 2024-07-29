import { Navigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  FormControl,
  Box,
  TextField,
} from "book-ui";

import styles from "./SignUp.page.module.scss";
import { AuthLayout } from "../../components/Layouts";
import { useUserQuery } from "../../tanstack";
import { Loading } from "../../components/Feedback";
import { useCallback } from "react";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match",
  ),
});

export const SignUpPage = () => {
  const { isLoading, data: user } = useUserQuery();

  const onSignUp = useCallback(() => {}, []);

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout>
      <Card>
        <CardHeader title="Sign Up" />
        <CardContent>
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
              repeatPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={onSignUp}
          >
            {({ values, errors, touched, setFieldValue, handleSubmit }) => (
              <FormControl fullWidth onSubmit={handleSubmit}>
                <Box className={styles.inputSpace}>
                  <TextField
                    variant="outlined"
                    placeholder="Username"
                    value={values.username}
                    onChange={(e) => setFieldValue("username", e.target.value)}
                    error={
                      touched.username && errors.username ? errors.username : ""
                    }
                    required
                  />
                  <TextField
                    variant="outlined"
                    placeholder="Email"
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    error={touched.email && errors.email ? errors.email : ""}
                    required
                  />
                  <TextField
                    variant="outlined"
                    placeholder="Password"
                    type="password"
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    error={
                      touched.password && errors.password ? errors.password : ""
                    }
                    required
                  />
                  <TextField
                    variant="outlined"
                    placeholder="Repeat Password"
                    type="password"
                    value={values.repeatPassword}
                    onChange={(e) =>
                      setFieldValue("repeatPassword", e.target.value)
                    }
                    error={
                      touched.repeatPassword && errors.repeatPassword
                        ? errors.repeatPassword
                        : ""
                    }
                    required
                  />
                  <Button
                    type="submit"
                    disabled={!!Object.values(errors).length}
                  >
                    Sign up
                  </Button>
                </Box>
              </FormControl>
            )}
          </Formik>
        </CardContent>
        <CardActions disableSpacing end>
          <Button variant="text" href="/sign-in">
            Sign in
          </Button>
        </CardActions>
      </Card>
    </AuthLayout>
  );
};
