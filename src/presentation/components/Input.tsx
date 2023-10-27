import React from "react";
import { Text } from "./Text";
import { useFieldChanges } from "../../hooks";

export interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelText?: string;
    error?: string;
    styleContent?: React.CSSProperties;
    styleField?: React.CSSProperties;
    styleFloatingLabel?: React.CSSProperties;
    leading?: React.ReactElement;
}

const Input = ({ labelText, error, styleContent, styleField, styleFloatingLabel, leading, ...props }: Props) => {
    const { inputRef, textField, floatingLabel, onBlur, onFocus } = useFieldChanges();
    return (
        <div style={styleContent} className="input-container">
            <label style={styleField} className={`field-container`}>
                <label ref={textField} className={`field ${error ? 'field-error' : ''} ${leading ? 'field-leading' : ''}`}>
                    {leading}
                    <input
                        className="input"
                        {...props}
                        ref={inputRef}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </label>
                {labelText && <span style={styleFloatingLabel} ref={floatingLabel} className={`floating-label ${leading ? 'floating-label-leading' : ''}`}>{labelText}</span>}
            </label>
            {error && <Text variant="Body-medium" className="text-error">{error}</Text>}
        </div>
    )
};

export default Input;
