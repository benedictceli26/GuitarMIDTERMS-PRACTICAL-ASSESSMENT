import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columns = [
  {
    accessorKey: "model",
    header: "Guitar Model",
  },
  {
    accessorKey: "bodyType",
    header: "Body Type",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

function GuitarTable({
  guitars,
  selectedGuitar,
  onSelectGuitar,
}) {
  const table = useReactTable({
    data: guitars,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
  });

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Guitar Registry
      </Typography>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          overflowX: "auto",
        }}
      >
        <Table
          sx={{
            minWidth: 750,
          }}
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                hover
                selected={
                  selectedGuitar?.id === row.original.id
                }
                onClick={() =>
                  onSelectGuitar(row.original)
                }
                sx={{
                  cursor: "pointer",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {guitars.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No guitar records available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Typography>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {Math.max(table.getPageCount(), 1)}
        </Typography>

        <Button
          variant="outlined"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default GuitarTable;