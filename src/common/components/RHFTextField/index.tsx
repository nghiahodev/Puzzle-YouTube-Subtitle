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

interface TextFieldProps<T extends FieldValues>
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
}: TextFieldProps<T>) => {
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
          size='small'
          margin='normal'
          spellCheck={false}
          sx={{
            '& input::placeholder': {
              fontSize: '0.875rem', // hoặc '14px' tùy ý
            },
          }}
          {...props}
        />
      )}
    />
  )
}

export default RHFTextField
