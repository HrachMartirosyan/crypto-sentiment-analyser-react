import { ChangeEvent, useCallback } from "react";
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
import { useUserQuery, useSignInMutation } from "../../tanstack";
import { Loading } from "../../components/Feedback";
import { SignInDto } from "../../dto/auth.dto.ts";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../dto/api.dto.ts";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Please write an email").required("Required"),
  password: Yup.string()
    .min(8, "Password is too short (min 8 chars)")
    .max(20, "Password is too long (max 20 chars)")
    .required("Required"),
});

export const SignInPage = () => {
  const { isLoading, data: user } = useUserQuery();
  const signInUserMutation = useSignInMutation();
  const signInError = (signInUserMutation?.error as AxiosError<ErrorResponse>)
    ?.response?.data;

  const onSignIn = useCallback(
    (values: SignInDto) => {
      signInUserMutation.mutate(values);
    },
    [signInUserMutation],
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
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={onSignIn}
          >
            {({ values, errors, touched, setFieldValue, handleSubmit }) => (
              <FormControl fullWidth onSubmit={handleSubmit}>
                <Box className={styles.inputSpace}>
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
                  {signInError?.message && (
                    <Typography error variant="span">
                      {signInError.message}
                    </Typography>
                  )}
                  <Button type="submit" loading={signInUserMutation.isPending}>
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
