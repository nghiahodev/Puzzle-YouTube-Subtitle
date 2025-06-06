import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  RegisterOptions,
} from 'react-hook-form'
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'

export interface RHFTextFieldProps<T extends FieldValues>
  extends Omit<MuiTextFieldProps, 'name'> {
  name: FieldPath<T>
  control: Control<T>
  rules?: RegisterOptions<T, FieldPath<T>>
}

const RHFTextField = <T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: RHFTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <MuiTextField
          {...field}
          error={!!error}
          helperText={error?.message}
          fullWidth
          margin='normal'
          spellCheck={false}
          slotProps={{
            inputLabel: {
              sx: {
                fontWeight: 'bold',
              },
            },
          }}
          {...props}
        />
      )}
    />
  )
}

export default RHFTextField
