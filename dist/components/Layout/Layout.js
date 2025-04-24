import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
function Layout() {
    return (_jsxs("div", { children: [_jsx("header", { children: _jsx(AppBar, { position: 'static', children: _jsx(Toolbar, { variant: "dense", children: _jsx(Typography, { variant: 'h4', component: "div", children: "CSV Upload" }) }) }) }), _jsx("div", { children: _jsx(Outlet, {}) })] }));
}
export default Layout;
