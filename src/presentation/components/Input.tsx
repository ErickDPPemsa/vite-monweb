import React from "react";
import { Text } from "./Text";
import { useFieldChanges } from "../../hooks";

export interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelText?: string;
    error?: string;
    styleContent?: React.CSSProperties;
    classNameContent?: string;
    styleField?: React.CSSProperties;
    styleFloatingLabel?: React.CSSProperties;
    leading?: React.ReactElement;
    trailing?: React.ReactElement;
    reference?: React.RefObject<HTMLInputElement>;
}

const Input = ({ labelText, error, styleContent, styleField, styleFloatingLabel, leading, trailing, classNameContent, reference, ...props }: Props) => {
    const { inputRef, textField, floatingLabel, onBlur, onFocus } = useFieldChanges({ reference });
    return (
        <div style={styleContent} className={`input-container ${classNameContent}`}>
            <label style={styleField} className={`field-container`}>
                <label ref={textField} className={`field ${error ? 'field-error' : ''} ${leading ? 'field-leading' : ''} ${trailing ? 'field-trailing' : ''}`}>
                    {leading}
                    <input
                        className="input"
                        {...props}
                        ref={inputRef}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        style={{ color: error ? 'var(--error)' : 'currentcolor' }}
                    />
                    {trailing}
                </label>
                {labelText && <span style={styleFloatingLabel} ref={floatingLabel} className={`floating-label ${leading ? 'floating-label-leading' : ''}`}>{labelText}</span>}
            </label>
            {error && <Text variant="Label-medium" className="text-error">{error}</Text>}
        </div>
    )
};

export default Input;
