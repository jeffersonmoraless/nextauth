"use client";
import { useForm } from "react-hook-form";
import styles from "./Login-form.module.css";
interface LoginFormUser {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormUser>();

  const sign_in = (data: LoginFormUser) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(sign_in)}
        className="bg-gray-200 p-8 rounded-lg shadow-lg max-w-md w-full h-full "
      >
        <h2 className=" text-2xl font-bold text-center pb-2.5 ">Login</h2>

        <span
          className={`${styles.spanMessageError} ${
            errors.email ? "visible" : "invisible"
          }`}
        >
          {errors.email ? errors.email.message : "error"}
        </span>

        <input
          type="email"
          placeholder="email"
          className={`${styles.inputField} ${
            errors.email ? styles.inputFieldError : ""
          } `}
          {...register("email", { required: "This field email is required." })}
        />

        <span
          className={`${styles.spanMessageError} ${
            errors.password ? "visible" : "invisible"
          }`}
        >
          {errors.password ? errors.password.message : "error"}
        </span>

        <input
          type="password"
          placeholder="password"
          className={`${styles.inputField} ${
            errors.password ? styles.inputFieldError : ""
          }`}
          {...register("password", {
            required: "This field password is required.",
          })}
        />
        <button type="submit" className={`${styles.btn}`}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
