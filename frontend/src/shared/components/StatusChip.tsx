import { Chip } from '@mui/material';
import type { TLoanStatus } from '@/shared/types';

interface IStatusChipProps {
  status: TLoanStatus;
}

const statusConfig: Record<TLoanStatus, { label: string; color: 'info' | 'success' | 'error' }> = {
  ATIVO: { label: 'Ativo', color: 'info' },
  DEVOLVIDO: { label: 'Devolvido', color: 'success' },
  ATRASADO: { label: 'Atrasado', color: 'error' },
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
