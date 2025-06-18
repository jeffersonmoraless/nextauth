"use client";
import { api } from "@/lib/api";
import styles from "./Register-form.module.css";
import { useForm } from "react-hook-form";

interface RegisterFormUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormUser>();

  const signin_up = async (data: RegisterFormUser) => {
    try {
      const response = await api.post("/register", data);
      console.log("Usuário registrado:", response.data);
      // Resetar o formulário ou redirecionar o usuário, se quiser
    } catch (error: any) {
      console.error(
        "Erro ao registrar:",
        error.response?.data || error.message
      );
      // Exibir mensagem para o usuário, se necessário
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(signin_up)}
        className="bg-gray-200 p-8 rounded-lg shadow-lg max-w-md w-full h-full "
      >
        <h2 className=" text-2xl font-bold text-center pb-2.5">Register</h2>

        <span
          className={`${styles.spanMessageError} ${
            errors.name ? "visible" : "invisible"
          }`}
        >
          {errors.name ? errors.name.message : "error"}
        </span>

        <input
          type="text"
          placeholder="name"
          className={`${styles.inputField} ${
            errors.name ? styles.inputFieldError : ""
          }`}
          {...register("name", { required: "This field name is required." })}
        />

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
          }`}
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

        <span
          className={`${styles.spanMessageError} ${
            errors.confirmPassword ? "visible" : "invisible"
          }`}
        >
          {errors.confirmPassword ? errors.confirmPassword.message : "error"}
        </span>

        <input
          type="password"
          placeholder="confirm password"
          className={`${styles.inputField} ${
            errors.confirmPassword ? styles.inputFieldError : ""
          }`}
          {...register("confirmPassword", {
            required: "This field Confirm Password is required.",
          })}
        />
        <button type="submit" className={`${styles.btn}`}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
