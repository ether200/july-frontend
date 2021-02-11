import { ValidationRule, UseFormMethods } from "react-hook-form";

interface InputProps
  extends Partial<Pick<UseFormMethods, "register" | "errors">> {
  rules?: ValidationRule;
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | undefined;
  type: "text" | "email" | "password";
}

const FormInput: React.FC<InputProps> = ({
  register,
  errors,
  label,
  id,
  ...inputProps
}): JSX.Element => {
  return (
    <div className="form__control">
      <label htmlFor={id}>{label}</label>
      <input ref={register} id={id} {...inputProps} />
      {errors && <span>{errors.message}</span>}
    </div>
  );
};

export default FormInput;
