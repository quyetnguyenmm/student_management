import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  label?: string;
  value: string | number;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  disabled?: boolean;
  options: RadioOption[];
}

export function RadioGroupField({ name, control, label, disabled, options }: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <FormControl error={invalid} disabled={disabled}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            label={option.label}
            value={option.value}
            control={<Radio />}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
