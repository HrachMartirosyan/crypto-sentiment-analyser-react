import { useCallback } from "react";
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
  Typography,
} from "book-ui";

import styles from "./SignIn.page.module.scss";
import { AuthLayout } from "../../components/Layouts";
import { useUserQuery, useAuthUserMutation } from "../../tanstack";
import { Loading } from "../../components/Feedback";
import { SignInDto } from "../../dto/auth.dto.ts";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../dto/api.dto.ts";

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});

export const SignInPage = () => {
  const { isLoading, data: user } = useUserQuery();
  const authUser = useAuthUserMutation();
  const signInError = (authUser?.error as AxiosError<ErrorResponse>)?.response
    ?.data;

  const onSignIn = useCallback(
    (values: SignInDto) => {
      authUser.mutate(values);
    },
    [authUser],
  );

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout>
      <Card>
        <CardHeader title="Sign In" />
        <CardContent>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={onSignIn}
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
                    placeholder="Password"
                    type="password"
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    error={
                      touched.password && errors.password ? errors.password : ""
                    }
                    required
                  />
                  {signInError?.message && (
                    <Typography error variant="span">
                      {signInError.message}
                    </Typography>
                  )}
                  <Button type="submit" loading={authUser.isPending}>
                    Sign In
                  </Button>
                </Box>
              </FormControl>
            )}
          </Formik>
        </CardContent>
        <CardActions disableSpacing end>
          <Button variant="text" href="/sign-up">
            Sign up
          </Button>
        </CardActions>
      </Card>
    </AuthLayout>
  );
};
