import { Box, Button, Divider, Grid, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { useState } from 'react'
import { data } from 'react-router-dom';
import { POST, UPLOADCSV } from '../../helpers/fetchApi';
import { rowDummy } from './mockupdata';
import AttachFileIcon from '@mui/icons-material/AttachFile';

type Column = {
  id: 'status' | 'system_transaction_id' | 'amount',
  label: string,
  minWidth?:  number;
  align?: 'right';
  // format?: (value: number) => string;
}

export type csvData = {
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
    id: 'system_transaction_id',
    label: "System Transaction ID",
  },
  {
    id: 'amount',
    label: "Amount",
  }
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
  const [file, setFile] = useState<File | null>(null) ;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0)
  }

  const handleGetCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null)
  }

  const handleUploadCSV = async () => {
    console.log("Handle Upload is called")
    try{
      const res: any = await POST(UPLOADCSV, file, true)
      if (res.success){
        console.log("API called is succesful")
      }
      else{
        console.log("Else is called")
      }
    }
    catch (error){
      console.log("error : ", error)
    }


  }

  return (
    <div className='upload'>
      <Paper variant="elevation" className='upload-border' >
      <Typography variant='h4' textAlign={'left'} padding={2}>Upload CSV</Typography>
      <Divider textAlign="center"><Typography variant='h6' textAlign={'left'} padding={2}>Assign File</Typography></Divider>
      <div>
      <Grid container spacing={2}>
        <Grid size={4}>
        <Button
        component="label"
        startIcon={<AttachFileIcon/>}
        variant="outlined"
        size="large"
        className='assign-button'
      >
        <Typography variant='h4' textAlign={'center'} >Assign CSV</Typography>
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => handleGetCSV(event)}
          multiple
        />
      </Button>
        </Grid>
        <Grid size={8}>
        <Typography variant='h4' textAlign={'center'} align='center' className='upload-button'>{file?.name ?? "Please assign the csv file."}</Typography>
        </Grid>
      </Grid>
      </div>
      <Divider textAlign="center"><Typography variant='h6' textAlign={'left'} padding={2}>Upload File</Typography></Divider>
      
      <div>
        <Grid container spacing = {2}>
        <Grid size= {8}>
            
            </Grid>
          <Grid size= {4}>
          <Button
            component="label"
            startIcon={<CloudUploadIcon/>}
            variant="outlined"
            size="large"
            className='upload-button'
            onClick={handleUploadCSV}
          >
            <Typography variant='h4' textAlign={'center'} >Submit CSV</Typography>
          </Button>

          </Grid>

        </Grid>


      </div>
      
      </Paper>

      <Paper variant="elevation" className='upload-border' sx={{overflow: 'hidden'}} >
        <TableContainer sx={{maxHeight:440}}>
        <Table stickyHeader aria-label="sticky table">
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

            <TableBody>
              {rowDummy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((datalist) => {
                return (
                  <TableRow key={datalist.system_transaction_id}>
                    {columns.map((column) => {
                      const value = datalist[column.id];
                      if(column.id == "status"){
                        switch(value){
                          case "successful":{
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Box
                                  sx={{
                                    width: 100,
                                    height: 30,
                                    borderRadius: 5,
                                    bgcolor: 'rgba(20, 233, 38, 0.2)', // 
                                    color: '#7DDA58',
                                  }}>
                                  <Typography variant='subtitle1' component="div" textAlign={'center'}>Success</Typography>
                                </Box>
                              </TableCell>
                            )
                          }
                          case "pending":{
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Box
                                  sx={{
                                    width: 100,
                                    height: 30,
                                    borderRadius: 5,
                                    bgcolor: 'rgba(255, 222, 89, 0.5)',
                                    color: '#CCB446',
                                  }}>
                                  <Typography variant='subtitle1' component="div" textAlign={'center'}>Pending</Typography>
                                </Box>
                              </TableCell>
                            )
                          }
                          case "failed":{
                            return (
                              <TableCell key={column.id} align={column.align}>
                              <Box
                                  sx={{
                                    width: 100,
                                    height: 30,
                                    borderRadius: 5,
                                    bgcolor: 'rgba(255, 89, 89, 0.5)',
                                    color: '#D20103',
                                  }}>
                                  <Typography variant='subtitle1' component="div" textAlign={'center'}>Failed</Typography>
                                </Box>
                                </TableCell>
                            )
                          }
                        }
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      )
                    })}

                  </TableRow>
                )
              })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowDummy.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
      
    </div>
    
  )
}

export default UploadPage