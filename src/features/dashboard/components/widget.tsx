import { Box, Paper, Typography, styled } from '@mui/material';
import { ReactElement } from 'react';

export interface WidgetProps {
  title: string;
  children: string | ReactElement;
}

const WidgetWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

export default function Widget({ title, children }: WidgetProps) {
  return (
    <WidgetWrapper>
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </WidgetWrapper>
  );
}
