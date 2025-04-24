import { jsx as _jsx } from "react/jsx-runtime";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesManagement from './RoutesManagement';
function App() {
    return (_jsx(BrowserRouter, { children: _jsx(RoutesManagement, {}) }));
}
export default App;
