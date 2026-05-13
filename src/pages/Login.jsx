import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const Login = () => {
  //   const users = [{
  //     email : "aleeshya@gmail.com",
  //     password : "123"},
  //     {

  //     }
  // ]

  const [user, setUser] = useState(null);
  const { setRole } = useCart();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("credentials"));
    if (user) {
      navigate("/home");
      setRole(user);
    }
  }, []);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().required("Password required"),
    role: Yup.string().required("Role required"),
  });

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2>Login</h2>

      <Formik
        initialValues={{
          email: "",
          password: "",
          role: "user",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // const user = JSON.parse(localStorage.getItem("credentials"));

          if (!user) {
            console.log("No user found");
            return;
          }
          if (
            user.email === values.email &&
            user.password === values.password &&
            user.role === values.role
          ) {
            navigate("/home");
            setRole(user);
          } else {
            console.log("Invalid details");
          }
        }}
      >
        <Form className="from-container">
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
            <ErrorMessage name="role" component="div" className="text-danger" />
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
          <div className="d-flex  justify-content-between gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              onClick={() => navigate("/signup")}
              type="button"
              className="btn btn-primary  "
            >
              register an account
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
