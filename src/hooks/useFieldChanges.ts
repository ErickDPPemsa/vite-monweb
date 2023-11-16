import React from "react";

export function useFieldChanges({ reference }: { reference?: React.RefObject<HTMLInputElement> }) {
    const textField = React.useRef<HTMLLabelElement>(null);
    const floatingLabel = React.useRef<HTMLSpanElement>(null);
    let inputRef = reference ?? React.useRef<HTMLInputElement>(null);

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

    return {
        textField,
        floatingLabel,
        inputRef,
        onFocus,
        onBlur,
    }
}
