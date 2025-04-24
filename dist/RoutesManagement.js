import { jsx as _jsx } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UploadPage } from "./pages/UploadPage";
//import { Table } from "./pages/Table";
function RoutesManagement() {
    return (_jsx(Routes, { children: _jsx(Route, { element: _jsx(Layout, {}), children: _jsx(Route, { path: "/", element: _jsx(UploadPage, {}) }) }) }));
}
export default RoutesManagement;
