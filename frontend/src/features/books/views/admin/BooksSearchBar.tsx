import { Box, Paper, TextField } from "@mui/material";

interface BooksSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function BooksSearchBar({ value, onChange }: BooksSearchBarProps) {
  return (
    <Paper sx={{
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
      }}>
      <Box p={2}>
        <TextField
          fullWidth
          placeholder="Buscar por título..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Box>
    </Paper>
  );
}
