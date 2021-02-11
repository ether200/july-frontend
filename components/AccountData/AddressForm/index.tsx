import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddressSchema } from "../../../yup";
import { createAddress, updateAddress } from "../../../axios/addressApi";
import { AddressI } from "../../../intefaces";
import { isArrayNotEmpty } from "../../../utils";
import FormInput from "../../FormInput";

export type AddressValues = {
  title?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
};

type Props = {
  userId: string;
  address: Array<AddressI>;
  mutateAddress: (
    data?: AddressI[],
    shouldRevalidate?: boolean
  ) => Promise<AddressI[]>;
};

const AdressForm: React.FC<Props> = ({ userId, address, mutateAddress }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm<AddressValues>({
    resolver: yupResolver(AddressSchema),
  });

  const addressExist = isArrayNotEmpty(address);

  const onSubmit: SubmitHandler<AddressValues> = async (formData) => {
    setLoading(true);
    if (addressExist) {
      const status = await updateAddress(address[0]?.id, formData);
      if (status === 200) {
        mutateAddress();
      }
    } else {
      setLoading(true);
      const newAddress = { user: userId, ...formData };
      const status = await createAddress(newAddress);
      if (status === 200) {
        mutateAddress();
      }
    }
    setLoading(false);
  };

  const title = addressExist ? "Edit your address" : "Add your address";
  const action = addressExist ? "Edit Address" : "Add Address";

  return (
    <div className="form" onClick={(e) => e.stopPropagation()}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="title"
          name="title"
          type="text"
          label="Title"
          register={register}
          errors={errors.title}
          defaultValue={address[0]?.title || ""}
        />
        <FormInput
          id="address"
          name="address"
          type="text"
          label="Address"
          register={register}
          errors={errors.address}
          defaultValue={address[0]?.address || ""}
        />
        <FormInput
          id="city"
          name="city"
          type="text"
          label="City"
          register={register}
          errors={errors.city}
          defaultValue={address[0]?.city || ""}
        />
        <FormInput
          id="state"
          name="state"
          type="text"
          label="State"
          register={register}
          errors={errors.state}
          defaultValue={address[0]?.state || ""}
        />
        <FormInput
          id="postalCode"
          name="postalCode"
          type="text"
          label="Postal Code"
          register={register}
          errors={errors.postalCode}
          defaultValue={address[0]?.postalCode || ""}
        />
        <FormInput
          id="phone"
          name="phone"
          type="text"
          label="Phone"
          register={register}
          errors={errors.phone}
          defaultValue={address[0]?.phone || ""}
        />
        <button className={!loading ? "btn" : "btn btn--loading"} type="submit">
          <span className="btn__text">{action}</span>
        </button>
      </form>
    </div>
  );
};

export default AdressForm;
