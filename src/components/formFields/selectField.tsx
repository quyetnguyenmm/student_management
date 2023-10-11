import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label: string;
  value: string | number;
}
export interface SelectFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  disabled?: boolean;
  options: SelectOption[];
}

export function SelectField({ label, name, control, disabled, options }: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl size="small" fullWidth error={invalid}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
