import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UploadPage  } from "./pages/UploadPage";
//import { Table } from "./pages/Table";

function RoutesManagement() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<UploadPage />} />
        {/* <Route path="/Table" element={<Table />} /> */}
      </Route>
    </Routes>
  );
}

export default RoutesManagement;