import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeTable from './Screens/Employee_table';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<EmployeeTable />} />
        </Routes>
      </main>
    </BrowserRouter>
    // <div className="App">
    //   <EmployeeTable />
    // </div>
  );
}

export default App;
