import { useMemo } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Alert, Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useUsers } from "../hooks/useUsers";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "username", headerName: "Username", flex: 1, minWidth: 120 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
  { field: "phone", headerName: "Phone", flex: 1, minWidth: 160 },
  { field: "website", headerName: "Website", flex: 1, minWidth: 130 },
  {
    field: "company",
    headerName: "Company",
    flex: 1,
    minWidth: 150,
    valueGetter: (_value: unknown, row: { company?: { name?: string } }) =>
      row.company?.name ?? "",
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
    minWidth: 120,
    valueGetter: (_value: unknown, row: { address?: { city?: string } }) =>
      row.address?.city ?? "",
  },
];

export default function UserDataGrid() {
  const { users, loading, error, refetch } = useUsers();

  const rows = useMemo(() => users, [users]);

  return (
    <Box sx={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" component="h2">
          Users
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => void refetch()}
          disabled={loading}
          size="small"
        >
          Refresh
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
    </Box>
  );
}
