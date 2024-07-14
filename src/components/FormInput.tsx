import { Label } from "./ui/label";
import { Input } from "./ui/input";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  [x: string]: string | undefined;
};

function FormInput({
  label,
  name,
  type,
  defaultValue,
  ...rest
}: FormInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        
        name={name}
        type={type}
        defaultValue={defaultValue}
        {...rest}
      />
    </div>
  );
}
export default FormInput;
