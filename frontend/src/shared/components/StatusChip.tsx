import { Chip } from '@mui/material';
import type { TLoanStatus } from '@/shared/types';

interface IStatusChipProps {
  status: TLoanStatus;
}

const statusConfig = {
  ATIVO: { label: 'Ativo', color: 'info' as const },
  DEVOLVIDO: { label: 'Devolvido', color: 'success' as const },
  ATRASADO: { label: 'Atrasado', color: 'error' as const },
};

export function StatusChip({ status }: IStatusChipProps) {
  const config = statusConfig[status];
  
  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
}
