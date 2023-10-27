import React from "react";
import { TypeScale } from "../interfaces/types";

interface Props {
    children: React.ReactNode;
    variant?: TypeScale;
    style?: React.CSSProperties | undefined;
    className?: string;
}
export const Text = ({ variant = 'Body-large', children, style, className }: Props) => {
    return (
        <p className={`text ${variant} ${className}`} style={style}>{children}</p>
    )
}
