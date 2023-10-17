import React from "react";
import { TypeScale } from "../interfaces/types";

interface Props {
    children: React.ReactNode;
    variant?: TypeScale;
    style?: React.CSSProperties | undefined;
    className?: string;
}
export const Text = ({ variant = TypeScale.label_medium, children, style, className }: Props) => {
    return (
        <p style={style} className={`${variant} ${className ? className : 'text'}`}>{children}</p>
    )
}
