import { useEffect } from 'react'
import {
  useWatch,
  FieldValues,
  UseFormSetValue,
  PathValue,
  FieldPath,
} from 'react-hook-form'
import RHFTextField, {
  RHFTextFieldProps,
} from '~/common/components/RHFTextField'

export interface RHFNumberBoundFieldProps<T extends FieldValues>
  extends Omit<RHFTextFieldProps<T>, 'type'> {
  min: number
  max: number
  setValue: UseFormSetValue<T>
}

const RHFNumberBoundField = <T extends FieldValues>({
  name,
  control,
  setValue,
  min,
  max,
  ...rest
}: RHFNumberBoundFieldProps<T>) => {
  const value = useWatch({ control, name })

  useEffect(() => {
    if (value === undefined || value === null || value === '') return

    const num = typeof value === 'number' ? value : parseFloat(value)
    if (Number.isNaN(num)) return

    if (max && num > max)
      setValue(name, max as PathValue<T, FieldPath<T>>, {
        shouldValidate: true,
      })
    else if (min && num < min)
      setValue(name, min as PathValue<T, FieldPath<T>>, {
        shouldValidate: true,
      })
  }, [value])

  return (
    <RHFTextField
      {...rest}
      name={name}
      control={control}
      type='number'
      slotProps={{
        input: {
          inputProps: {
            step: 0.1,
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
              const allowedKeys = ['ArrowUp', 'ArrowDown']
              if (!allowedKeys.includes(e.key)) {
                e.preventDefault()
              }
            },
          },
        },
      }}
    />
  )
}

export default RHFNumberBoundField
