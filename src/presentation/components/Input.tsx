import React from "react";
import { Text } from "./Text";

export interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelText?: string;
    error?: string;
}

const Input = ({ labelText, error, ...props }: Props) => {
    const textField = React.useRef<HTMLLabelElement>(null);
    const floatingLabel = React.useRef<HTMLSpanElement>(null);
    let inputRef = React.useRef<HTMLInputElement>(null);

    React.useLayoutEffect(() => {
        if (inputRef.current?.value.length !== 0) {
            floatingLabel.current?.classList.add('floating-label-top');
        }
    }, [inputRef.current]);

    const onFocus: React.FocusEventHandler<HTMLInputElement> = React.useCallback(() => {
        floatingLabel.current?.classList.add('floating-label-top');
        textField.current?.classList.add(`field-active`);
    }, [textField.current, floatingLabel.current]);

    const onBlur: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
        ({ target: { value } }) => {
            textField.current?.classList.remove(`field-active`);
            if (value.length === 0) {
                floatingLabel.current?.classList.remove('floating-label-top');
            }
        }, [textField.current, floatingLabel.current]);

    return (
        <div className="input-container">
            <label className={`field-container`}>
                <label ref={textField} className={`field ${error ? 'field-error' : ''}`}>
                    <input
                        className="input"
                        {...props}
                        ref={inputRef}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </label>
                {labelText && <span ref={floatingLabel} className="floating-label">{labelText}</span>}
            </label>
            {error && <Text className="text-error">{error}</Text>}
        </div>
    )
};

export default Input;
