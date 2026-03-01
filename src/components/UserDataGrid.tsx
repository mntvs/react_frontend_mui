import { useMemo, useState } from "react";
import { DataGrid, type GridColDef, type GridRowSelectionModel, type GridRowId } from "@mui/x-data-grid";
import { Alert, Box, Button, Card, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../types/User";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Имя", flex: 1, minWidth: 150 },
  { field: "username", headerName: "Имя пользователя", flex: 1, minWidth: 120 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
  { field: "phone", headerName: "Телефон", flex: 1, minWidth: 160 },
  { field: "website", headerName: "Веб-сайт", flex: 1, minWidth: 130 },
  {
    field: "company",
    headerName: "Компания",
    flex: 1,
    minWidth: 150,
    valueGetter: (_value: unknown, row: { company?: { name?: string } }) =>
      row.company?.name ?? "",
  },
  {
    field: "city",
    headerName: "Город",
    flex: 1,
    minWidth: 120,
    valueGetter: (_value: unknown, row: { address?: { city?: string } }) =>
      row.address?.city ?? "",
  },
];

export default function UserDataGrid() {
  const { users, loading, error, refetch } = useUsers();
  const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(null);

  const rows = useMemo(() => users, [users]);

  const selectedUser = useMemo<User | null>(() => {
    if (selectedRowId == null) return null;
    return users.find((u) => u.id === selectedRowId) ?? null;
  }, [selectedRowId, users]);

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectedRowId(newSelection.length > 0 ? newSelection[0] : null);
  };

  return (
    <Box sx={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" component="h2">
          Пользователи
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => void refetch()}
          disabled={loading}
          size="small"
        >
          Обновить
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          checkboxSelection
          disableMultipleRowSelection
          rowSelectionModel={selectedRowId != null ? [selectedRowId] : []}
          onRowSelectionModelChange={handleSelectionChange}
          slots={{
            loadingOverlay: () => <LinearProgress />,
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "action.hover",
            },
          }}
        />
      </Box>

      {selectedUser && (
        <Card sx={{ mt: 2 }} data-testid="user-detail-panel">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Детали пользователя
            </Typography>
            <Typography><strong>Имя:</strong> {selectedUser.name}</Typography>
            <Typography><strong>Имя пользователя:</strong> {selectedUser.username}</Typography>
            <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
            <Typography><strong>Телефон:</strong> {selectedUser.phone}</Typography>
            <Typography><strong>Веб-сайт:</strong> {selectedUser.website}</Typography>
            <Typography><strong>Компания:</strong> {selectedUser.company.name}</Typography>
            <Typography><strong>Адрес:</strong> {[selectedUser.address.street, selectedUser.address.suite, selectedUser.address.city, selectedUser.address.zipcode].filter(Boolean).join(", ")}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
