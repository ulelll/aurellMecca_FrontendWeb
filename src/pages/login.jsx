import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "../store/authStore";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/form_input";

const schema = yup.object().shape({
  email: yup.string().required("Email required").email(),
  password: yup.string().required("Password required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data.email, data.password);
      setToken(res.token);
      toast.success("Login success!");
      navigate("/users");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-container">
        <h2>Login</h2>
        <FormInput
          label="Email"
          register={register("email")}
          error={errors.email?.message}
        />
        <FormInput
          label="Password"
          type="password"
          register={register("password")}
          error={errors.password?.message}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;