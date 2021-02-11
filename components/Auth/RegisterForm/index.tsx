import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../../yup";
import { registerUser } from "../../../axios/userApi";
import FormInput from "../../FormInput";

export type RegisterFormValues = {
  username: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const { register, handleSubmit, errors } = useForm<RegisterFormValues>({
    mode: "onBlur",
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async ({
    username,
    name,
    lastName,
    email,
    password,
  }) => {
    setError(null);
    setLoading(true);
    const newUser = { username, name, lastName, email, password };
    const response = await registerUser(newUser);
    if (response?.status < 300) {
      router.push("/");
    } else {
      setError(response);
    }
    setLoading(false);
  };

  return (
    <div className="form">
      <h2>Register your account</h2>
      {error && <h5 className="error">{error}</h5>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="username"
          name="username"
          type="text"
          label="Username"
          register={register}
          errors={errors.username}
        />
        <FormInput
          id="name"
          name="name"
          type="text"
          label="Name"
          register={register}
          errors={errors.name}
        />
        <FormInput
          id="lastName"
          name="lastName"
          type="text"
          label="Last name"
          register={register}
          errors={errors.lastName}
        />
        <FormInput
          id="email"
          name="email"
          type="text"
          label="Email"
          register={register}
          errors={errors.email}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          register={register}
          errors={errors.password}
        />

        <FormInput
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          label="Confirm Password"
          register={register}
          errors={errors.passwordConfirm}
        />

        <button
          className={!loading ? "btn" : "btn btn--loading"}
          type="submit"
          disabled={loading}
        >
          <span className="btn__text">register</span>
        </button>
        <p className="form__action">
          Do you have an account?
          <Link href="/login">
            <a className="form__action__link">Log in</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
