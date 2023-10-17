import { Control, Path } from "react-hook-form";
import { Props } from "../../components/Input";
type FieldValues = Record<string, any>;
export interface TextFieldProps<T extends FieldValues> extends Props {
    control: Control<T, any>;
    name: Path<T>;
    labelText?: string;
}