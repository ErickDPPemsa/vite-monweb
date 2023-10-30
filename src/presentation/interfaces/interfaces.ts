import { Control, Path } from "react-hook-form";
import { Props } from "../components/Input";
import { Props as SelectProps } from "../components/Select";
type FieldValues = Record<string, any>;

export interface TextFieldProps<T extends FieldValues> extends Props {
    control: Control<T, any>;
    name: Path<T>;
}

export interface SelecFieldProps<T extends FieldValues> extends SelectProps {
    control: Control<T, any>;
    name: Path<T>;
}

export interface ModalContent {
    dialog: React.RefObject<HTMLDialogElement>;
    reference: React.RefObject<HTMLDivElement>;
    rect?: DOMRect;
}