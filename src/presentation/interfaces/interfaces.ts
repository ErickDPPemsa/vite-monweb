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

export interface ModalContent extends PropsForm {
    dialog: React.RefObject<HTMLDialogElement>;
    reference: React.RefObject<HTMLDivElement>;
    rect?: DOMRect;
}

export interface PropsForm {
    onSuccess?: (exit: boolean) => void;
}

/**Data-table */

export interface PropsSelect<T> {
    label: string;
    value: T;
}

export interface Key<T> {
    key: keyof T | Array<keyof T>;
    key2?: string;
    title?: string;
    select?: boolean;
    style?: React.CSSProperties;
}

export interface PropsDataTable<T> {
    title: string;
    data: Array<T>;
    id: keyof T;
    keys: Array<Key<T>>;
    indices?: boolean;
    starFilter: keyof T;
}