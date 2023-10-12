import { Box, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import StudentForm from '../components/studentForm';
import { history } from 'utils';
import { toast } from 'react-toastify';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<Student>();

  const isEdit = Boolean(studentId);
  const initialValue: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValue: Student) => {
    try {
      if (isEdit) {
        await studentApi.updateStudent(formValue);
      } else {
        await studentApi.addStudent(formValue);
      }
      toast.success('Save student successfully!');
      history.push('/admin/students');
    } catch (error) {
      console.log('Failed to add/update student', error);
    }
  };

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const student: Student = await studentApi.getStudentById(studentId);
        setStudent(student);
      } catch (error) {
        console.log('Failed to fetch student:', error);
      }
    })();
  }, [studentId]);

  return (
    <Box>
      <Link
        to="/admin/students"
        style={{ display: 'block', marginBottom: '1rem', textDecoration: 'none' }}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          <BiChevronLeft />
          Back to student list
        </Typography>
      </Link>

      <Typography variant="h4" mb={2}>
        {isEdit ? 'Update student info' : 'Add new student'}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <StudentForm initialValue={initialValue} onSubmit={handleStudentFormSubmit} />
      )}
    </Box>
  );
}
