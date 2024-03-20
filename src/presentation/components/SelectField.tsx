import { Controller } from "react-hook-form"
import { SelecFieldProps } from '../interfaces/interfaces'; import Select from "./Select";

export const SelectField = <T extends object>({ control, name, ...props }: SelecFieldProps<T>) => {
    return (
        <Controller
            control={control}
            rules={{
                required: { value: true, message: 'field is required' },
            }}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (
                    <Select
                        {...props}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value ?? ''}
                        error={error ? error.message : undefined}
                        name={name}
                        defaultValue={undefined}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        // placeholder={labelText}
                        hideSelectedOptions
                        isClearable
                    />
                )
            }}
        />
    )
}
