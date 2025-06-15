"use client";
import { useForm } from "react-hook-form";
const LoginForm = () => {
  const { handleSubmit, register } = useForm();

  const signin = (data: object) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(signin)}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full h-full "
      >
        <h2 className="mb-5 text-2xl text-center font-bold">Login</h2>
      <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="bg-blue-200 rounded-lg p-2 w-full mb-3"
          {...register("email")}
        />

        <label htmlFor="password">Password</label>
        <input
          placeholder="Enter your password"
          type="password"
          id="password"
          className="bg-blue-200 rounded-lg p-2 w-full mb-3"
          {...register("password")}
        />
        <button
          type="submit"
          className="bg-blue-500 font-bold text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-200"
        >
          Signin
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
