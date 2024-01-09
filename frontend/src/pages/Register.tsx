import { useForm } from "react-hook-form";
import * as apiClient from "../api_client";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
  
const Register =() => {
    const navigate = useNavigate();
    const {showToastMessage}=useAppContext();
    const queryClient = useQueryClient();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterFormData>();
    const {mutate} = useMutation(apiClient.register, {
      onSuccess: async () => {
        showToastMessage({
          message: "Registered successfully",
          type: "SUCCESS",
        });
        await queryClient.invalidateQueries("validateToken");
        navigate("/");
      },
      onError: (error:Error) => {
        showToastMessage({
          message: error.message,
          type: "ERROR",
        });
      },
    });
    const onSubmit = handleSubmit((data:RegisterFormData) => {
        mutate(data);
    });
    return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("first_name", { required: "This field is required" })}
          ></input>
            <span className="text-red-500">{errors.first_name?.message}</span>
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("last_name", { required: "This field is required" })}
          ></input>
            <span className="text-red-500">{errors.last_name?.message}</span>
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
          <span className="text-red-500">{errors.email?.message}</span>
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
          <span className="text-red-500">{errors.password?.message}</span>
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        ></input>
          <span className="text-red-500">{errors.confirmPassword?.message}</span>
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Already Registered?{" "}
          <Link className="underline" to="/sign-in">
            Sign In here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
    )
}
export default Register;