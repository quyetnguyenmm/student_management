import { Box, Paper, Typography, styled } from '@mui/material';
import { ReactElement } from 'react';

const StatisticItemWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),

  border: `1px solid ${theme.palette.divider}`,
}));

interface StatisticItemProps {
  icon: ReactElement;
  label: string;
  value: string | number;
}

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
  return (
    <StatisticItemWrapper>
      <Box>{icon}</Box>

      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </StatisticItemWrapper>
  );
}
