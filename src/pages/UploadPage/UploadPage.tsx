import { Box, Button, Paper, styled, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React from 'react'

type Column = {
  id: 'status' | 'transaction_id' | 'amount',
  label: string,
  minWidth?:  number;
  align?: 'right';
}

type csvData = {
  status:  string,
  system_transaction_id:  number,
  amount: number,
}

const columns:  readonly Column[] = [
  {
    id: 'status',
    label: "Status",
  },
  {
    id: 'transaction_id',
    label: "System Transaction ID",
  },
  {
    id: 'amount',
    label: "Amount",
  }
] 

const rowDummy: readonly csvData[] =[
  {
   status: "successful",
   system_transaction_id: 1,
   amount: 100,
  },
  {
    status: "pending",
    system_transaction_id: 2,
    amount: 200,
   },
   {
    status: "failed",
    system_transaction_id: 3,
    amount: 300,
   },
]

function UploadPage() {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect (0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0)
  }

  return (
    <div className='upload'>
      <Paper variant="elevation" className='upload-border' >
      <Typography variant='h4' textAlign={'left'} padding={2}>Upload CSV</Typography>
      <Button
        component="label"
        startIcon={<CloudUploadIcon/>}
        variant="outlined"
        size="large"
        className='upload-button'
      >
        <Typography variant='h4' textAlign={'center'} >Upload CSV</Typography>
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Button>
      </Paper>

      <Paper variant="elevation" className='upload-border' sx={{width: '100%', overflow: 'hidden'}} >
        <TableContainer sx={{maxHeight:440}}>
            <TableHead>
              <TableRow>
                {columns.map((columnList, columnIndex) => (
                  <TableCell
                    key={columnList.id}
                    align={columnList.align}
                    style={{minWidth: columnList.minWidth}}
                  >
                    {columnList.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* <TableBody>
              {rowDummy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((datalist) => {
                return (
                  <TableRow>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>

                        </TableCell>
                      )
                    })}

                  </TableRow>
                )
              })}
            </TableBody> */}
        </TableContainer>
      </Paper>
    </div>
    
  )
}

export default UploadPage