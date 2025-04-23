import { Box, Button, Divider, Grid, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { useMemo, useState } from 'react'
import { data } from 'react-router-dom';
import { GET, POST, POST_AUTH, UPLOADCSV } from '../../helpers/fetchApi';
import { rowDummy } from './mockupdata';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { OrderData } from '../../type.global';


type SortType = "string" | "number" | "boolean";
type Order = {
  order: OrderData;
  sortType: SortType;
};




type Column = {
  id: 'existsInDB' | 'system_transaction_id' | 'amount',
  label: string,
  type: string,
  minWidth?:  number;
  align?: 'right';
  // format?: (value: number) => string;
}

export type csvData = {
  existsInDB:  boolean,
  system_transaction_id:  string,
  amount: number,
}

type SearchData = {
  system_transaction_id: string;
};

const columns:  readonly Column[] = [
  {
    id: 'existsInDB',
    label: "Status",
    type: "boolean",
  },
  {
    id: 'system_transaction_id',
    label: "System Transaction ID",
    type: "string",
  },
  {
    id: 'amount',
    label: "Amount",
    type: "number"
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
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [file, setFile] = useState<File | null>(null) ;
  const [data, setData] = useState<csvData[]>([]);
  const [apiMessage, setApiMessage] = useState("");
  const [orderBy, setOrderBy] = useState<keyof csvData | null>(null);
  const [totalData, setTotalData] = useState(0);
  const [order, setOrder] = useState<Order>({
    order: "asc",
    sortType: "string",
  });
  const [searchData, setSearchData] = useState<SearchData>({
    system_transaction_id: "",
  });

  const onSort = (dataName: keyof csvData, dataType: SortType) => {
    console.log('dataType:', dataType)
    console.log('dataName:', dataName)
    const isAscending = order.order === "asc" ? "desc" : "asc";
    //const arrow = order.order === "asc" ? 1 : 0;
    setOrder((prev) => ({ ...prev, order: isAscending, sortType: dataType }));
    setOrderBy(dataName);
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const sortCompare = (a: any, b: any, dataType: SortType) => {
    if (dataType === "string") {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }
    // if (dataType === "date") {
    //   return new Date(a as string).valueOf() - new Date(b as string).valueOf();
    // }
    return a - b;
  };

  const dataList = useMemo(() => {
    console.log('searchData.system_transaction_id:', searchData.system_transaction_id)
    const filterData = data
      
      .filter((f) => {

        if (searchData.system_transaction_id) {
          
          return f.system_transaction_id.toLowerCase().startsWith(searchData.system_transaction_id.toLowerCase());
          
        }
        
        return f;
      })
    const result = filterData.sort((a, b) => {
      if (orderBy) {
        if (order.order === "asc") {
          return sortCompare(a[orderBy], b[orderBy], order.sortType);
        }
        return sortCompare(b[orderBy], a[orderBy], order.sortType);
      }
      return 0;
    });
    setTotalData(filterData.length);

    const startItem = page * rowsPerPage;
    const endItem = startItem + rowsPerPage;
    return result.slice(startItem, endItem);
  }, [
    JSON.stringify(data),
    page,
    orderBy,
    order.order,
    JSON.stringify(searchData),
    rowsPerPage,
  ]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // console.log('newPage:', newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    // console.log('+event.target.value:', +event.target.value)
    setPage(0)
  }

  const handleGetCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null)
  }


  const handleUploadCSV = async () => {
    setApiMessage("Uploading...")
    const formdata = new FormData
    formdata.append("file",file as Blob )
    // console.log("Handle Upload is called")
    try{
      const res: any = await POST(UPLOADCSV, formdata, true)
      if (res.data){
        console.log("API called is succesful")
        setApiMessage(res.message)
        setData(res.data)
        setTotalData(data.length)
      }
      else{
        setApiMessage(`API called is succesful, but backend responded with [${res.message}], Are you sure the uploaded file is valid?`)
        console.log("Data from Backend is missing!")
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
        <Typography variant='h4' textAlign={'center'} align='center' className='upload-button'>{apiMessage}</Typography>
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
        <TextField
          
          variant="outlined"
          type="string"
          name="system_transaction_id"
          id="search"
          label="Search for System Transaction ID : "
          value={searchData.system_transaction_id}
          // onKeyUp={() => setSearchInput()}
          placeholder="Please enter System Transaction ID"
          className='upload-button'
          onChange={onSearchChange}
        />
        <TableContainer sx={{maxHeight:500}}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((columnList, columnIndex) => (
                  <TableCell
                    key={columnList.id}
                    align={columnList.align}
                    style={{minWidth: columnList.minWidth}}
                  >
                    <TableSortLabel
                  active={orderBy === columnList.id}
                  direction={order.order}
                  // onClick={() => onSort(columnList.id, (columnList.type === "string") ? "string" : (columnList.type === "boolean") ? "boolean" 
                  //   : (columnList.type === "number") ? "number")}
                  onClick={() => onSort(columnList.id, columnList.type as "string" | "boolean" | "number")}
                >
                  {columnList.label}
                </TableSortLabel>
                    
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              
              {dataList.map((datalist , datalistIndex) => {
                // console.log('datalistIndex:', datalistIndex)
                return (
                  <TableRow key={datalistIndex}>
                    
                    {columns.map((column) => {
                      const value = datalist[column.id];
                      if(column.id === "existsInDB"){
                        // console.log('column.id:', column.id)
                        // console.log('column.id:', datalist.system_transaction_id)
                        // console.log('value:', value)
                        switch(value){
                          
                          case true:{
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
                                  <Typography variant='subtitle1' component="div" textAlign={'center'}>Matched</Typography>
                                </Box>
                              </TableCell>
                            )
                          }
                          case false:{
                            return (
                              <TableCell key={column.id} align={column.align}>
                              <Box
                                  sx={{
                                    width: 120,
                                    height: 30,
                                    borderRadius: 5,
                                    bgcolor: 'rgba(255, 89, 89, 0.5)',
                                    color: '#D20103',
                                  }}>
                                  <Typography variant='subtitle1' component="div" textAlign={'center'}>Not Matched</Typography>
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
        rowsPerPageOptions={[10, 25, 100, 250, 500]}
        component="div"
        count={totalData}
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