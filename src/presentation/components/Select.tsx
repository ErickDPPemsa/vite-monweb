import React from "react";
import { Text } from "./Text";
import SelectInput, { Props as PropsSelect } from "react-select";
import { useFieldChanges } from "../../hooks";

export interface Props extends PropsSelect {
    labelText?: string;
    error?: string;
    styleContent?: React.CSSProperties;
    styleField?: React.CSSProperties;
    styleFloatingLabel?: React.CSSProperties;
    leading?: React.ReactElement;
}

const Select = ({ labelText, error, styleContent, styleField, styleFloatingLabel, leading, ...props }: Props) => {
    const { textField, onBlur, onFocus } = useFieldChanges();

    return (
        <div style={styleContent} className="input-container">
            <label style={styleField} className={`field-container`}>
                <label style={{ padding: '0 5px' }} ref={textField} className={`field ${error ? 'field-error' : ''} ${leading ? 'field-leading' : ''}`}>
                    {leading}
                    <SelectInput
                        {...props}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </label>
            </label>
            {error && <Text className="text-error">{error}</Text>}
        </div>
    )
};

export default Select;
