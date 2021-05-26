import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginUser } from "../../../axios/userApi";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../../yup";

// Components
import FormInput from "../../FormInput";
import Link from "next/link";

export type LogFormValues = {
  identifier: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const { register, handleSubmit, errors } = useForm<LogFormValues>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LogFormValues> = async (logFormValues) => {
    setError(null);
    setLoading(true);
    const response = await loginUser(logFormValues);
    if (response?.status < 300) {
      // Navigate to previous page
      router.back();
    } else {
      setError(response);
    }
    setLoading(false);
  };

  return (
    <div className="center">
      <div className="form">
        <h2>Log in to your account</h2>
        {error && <h5 className="error">{error}</h5>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            id="identifier"
            name="identifier"
            type="text"
            label="Email"
            register={register}
            errors={errors.identifier}
          />
          <FormInput
            id="password"
            type="password"
            name="password"
            label="Password"
            register={register}
            errors={errors.password}
          />

          <button
            className={!loading ? "btn" : "btn btn--loading"}
            type="submit"
            disabled={loading}
          >
            <span className="btn__text">Log in</span>
          </button>
          <p className="form__action">
            Don't you have an account?
            <Link href="/register">
              <a className="form__action__link">Register</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
