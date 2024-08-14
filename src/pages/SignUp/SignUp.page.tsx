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

import styles from "./SignUp.page.module.scss";
import { AuthLayout } from "../../components/Layouts";
import { useSignUpMutation, useUserQuery } from "../../tanstack";
import { Loading } from "../../components/Feedback";
import { ChangeEvent, useCallback } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../dto/api.dto.ts";
import { SignUpDto } from "../../dto/auth.dto.ts";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Please write an email").required("Required"),
  username: Yup.string()
    .min(2, "username is too short (min 2 chars)")
    .max(16, "username is too long (max 16 chars)")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password is too short (min 8 chars)")
    .max(20, "Password is too long (max 20 chars)")
    .required("Required"),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match",
  ),
});

export const SignUpPage = () => {
  const { isLoading, data: user } = useUserQuery();
  const signUpUserMutation = useSignUpMutation();
  const signUpError = (signUpUserMutation?.error as AxiosError<ErrorResponse>)
    ?.response?.data;

  const onSignUp = useCallback(
    (values: SignUpDto) => {
      signUpUserMutation.mutate(values);
    },
    [signUpUserMutation],
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("username", e.target.value)
                    }
                    error={
                      touched.username && errors.username ? errors.username : ""
                    }
                    required
                  />
                  <TextField
                    variant="outlined"
                    placeholder="Email"
                    value={values.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("email", e.target.value)
                    }
                    error={touched.email && errors.email ? errors.email : ""}
                    required
                  />
                  <TextField
                    variant="outlined"
                    placeholder="Password"
                    type="password"
                    value={values.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("password", e.target.value)
                    }
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("repeatPassword", e.target.value)
                    }
                    error={
                      touched.repeatPassword && errors.repeatPassword
                        ? errors.repeatPassword
                        : ""
                    }
                    required
                  />
                  {signUpError?.message && (
                    <Typography error variant="span">
                      {signUpError.message}
                    </Typography>
                  )}
                  <Button type="submit">Sign up</Button>
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
