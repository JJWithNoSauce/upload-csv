import { AppBar, Paper, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <header>
        <AppBar position='static'>
          <Toolbar variant="dense">
            <Typography variant='h4' component="div" >CSV Upload</Typography>
          </Toolbar>
        </AppBar>
        
      </header>
      <div><Outlet/></div>
    </div>
  )
}

export default Layout