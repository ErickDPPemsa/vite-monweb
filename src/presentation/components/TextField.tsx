import { Controller } from "react-hook-form"
import { TextFieldProps } from "../interfaces/interfaces"
import { FloatingLabel } from "flowbite-react"

export const TextField = <T extends object>({ control, name, labelText, ...props }: TextFieldProps<T>) => {
    return (
        <Controller
            control={control}
            rules={{
                required: { value: true, message: 'field is required' },
            }}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <span>
                    <FloatingLabel className="bg-slate-50 dark:bg-slate-900" variant="outlined" label={labelText ?? ''} color={error ? 'error' : 'default'} value={value} onChange={onChange} onBlur={onBlur} {...props} />
                    {error && <p className="text-red-500 dark:text-red-400 ml-3 font-medium text-sm">{error.message}</p>}
                </span>
            )}
        />
    )
}
