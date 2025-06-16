"use client";
import { api } from "@/lib/api";

import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const { handleSubmit, register } = useForm();
  const signin_up = async (data: object) => {
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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(signin_up)}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full h-full "
      >
        <h2 className="mb-5 text-2xl text-center">Cadastre-se</h2>
        <input
          type="text"
          placeholder="nome"
          className="bg-blue-200 rounded-lg p-2 w-full mb-3"
          {...register("name")}
        />

        <input
          type="email"
          placeholder="email"
          className="bg-blue-200 rounded-lg p-2 w-full mb-3"
          {...register("email")}
        />

        <input
          type="password"
          placeholder="password"
          className="bg-blue-200 rounded-lg p-2 w-full mb-3"
          {...register("password")}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-200"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
