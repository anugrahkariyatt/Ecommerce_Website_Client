import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6).required("Password required"),
    role: Yup.string().required("Role required"),
  });

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2>SignUp</h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          role: "user",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (values.password !== confirmPassword) {
            setConfirmError("Passwords do not match");
            return;
          }

          setConfirmError("");
          localStorage.setItem("credentials", JSON.stringify(values));
          navigate("/home");
        }}
      >
        <Form className="from-container">
          <div className="mb-3">
            <label>Name</label>
            <Field name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label>Role</label>
            <Field as="select" name="role" className="form-select">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Field>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmError && <div className="text-danger">{confirmError}</div>}
          </div>
          <div className="d-flex  justify-content-between gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              onClick={() => navigate("/")}
              type="button"
              className="btn btn-primary"
            >
              Already have an account
            </button>
          </div>
          <div />
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
