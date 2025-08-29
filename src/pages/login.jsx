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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl mb-4">Login</h1>
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

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;