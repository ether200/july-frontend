import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateUserInfo } from "../../../../axios/userApi";
import { AccountSchema } from "../../../../yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserI } from "../../../../intefaces";

// Components
import FormInput from "../../..//FormInput";

export type AccountFormValues = {
  name?: string;
  lastName?: string;
  email?: string;
};

type Props = {
  userData: UserI;
  mutateUser: (data?: UserI, shouldRevalidate?: boolean) => Promise<UserI>;
};

const EditUserForm: React.FC<Props> = ({ userData, mutateUser }) => {
  const { register, handleSubmit, errors } = useForm<AccountFormValues>({
    resolver: yupResolver(AccountSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const onSubmit: SubmitHandler<AccountFormValues> = async (formData) => {
    setError(null);
    setLoading(true);
    const response = await updateUserInfo(userData.id, formData);
    if (response?.status < 300) {
      mutateUser();
    } else {
      setError(response);
    }
    setLoading(false);
  };

  return (
    <div className="form form--account">
      <h2>Edit Info</h2>
      {error && <h5 className="error">{error}</h5>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="name"
          name="name"
          type="text"
          label="Name"
          register={register}
          defaultValue={userData.name}
          errors={errors.name}
        />
        <FormInput
          id="lastName"
          name="lastName"
          type="text"
          label="Last name"
          register={register}
          defaultValue={userData.lastName}
          errors={errors.lastName}
        />
        <FormInput
          id="email"
          name="email"
          type="text"
          label="Email"
          register={register}
          defaultValue={userData.email}
          errors={errors.email}
        />
        <button
          className={!loading ? "btn" : "btn btn--loading"}
          type="submit"
          disabled={loading}
        >
          <span className="btn__text">Edit</span>
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
