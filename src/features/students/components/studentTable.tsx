import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { City, Student } from 'models';
import { Fragment, useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit: (student: Student) => void;
  onRemove: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleRemoveConfirm = () => {
    onRemove(selectedStudent as Student);
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id} sx={{ '&:last-child td': { border: 0 } }}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box fontWeight={600} color={getMarkColor(student.mark)}>
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => onEdit(student)}
                    sx={{ marginRight: '8px' }}>
                    Edit
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleRemoveClick(student)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen}>
        <DialogTitle>Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to remove named "{selectedStudent?.name}". This action can't be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={handleRemoveConfirm}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
