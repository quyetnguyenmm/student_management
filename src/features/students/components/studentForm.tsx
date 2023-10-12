import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/formFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface StudentFormProps {
  initialValue: Student;
  onSubmit: (formValue: Student) => void;
}

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
  const schema = yup
    .object({
      name: yup.string().required(),
      age: yup.number().positive().integer().required(),
      mark: yup.number().positive().min(0).max(10).required(),
      gender: yup.string().oneOf(['male', 'female']).required(),
      city: yup.string().required(),
    })
    .required();

  const cityOptions = useAppSelector(selectCityOptions);
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValue: any) => {
    onSubmit?.(formValue);
  };
  return (
    <Box width={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box mb={3}>
          <InputField label="Full name" name="name" control={control} />
        </Box>
        <Box mb={3}>
          <RadioGroupField
            label="Gender"
            name="gender"
            control={control}
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
          />
        </Box>
        <Box mb={3}>
          <InputField label="Age" name="age" control={control} type="number" />
        </Box>
        <Box mb={3}>
          <InputField label="Mark" name="mark" control={control} type="number" />
        </Box>

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField label="city" name="city" control={control} options={cityOptions} />
        )}

        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

// Student Form:
// Input: Initial values, onSubmit
