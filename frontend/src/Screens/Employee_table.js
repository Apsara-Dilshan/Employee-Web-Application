// Import necessary packages and components
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import EmployeeForm from './Employee_Form';

// Define function component
function EmployeeTable(props) {
  // Define all state variables using useState hook
  const [employees, setEmployees] = useState([]);
  const [editEmplyee, setEditEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [filter, setFilter] = useState('');
  const [show, setShow] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Define function to handle the sorting of employee table columns
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Define function to handle showing the employee form modal
  const handleShow = () => setShow(true);

  // Define function to handle closing the employee form modal
  const handleClose = () => {
    setShow(false);
    setRefresh((p) => !p);
    setFilter('');
  };
  // Define function to handle filtering the employee table
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Define function to handle deleting an employee
  const handleDeleteEmployee = (id) => {
    setDeletingId(id);
    setIsDeleteLoading(true);
    fetch(`http://localhost:5000/employees/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setIsDeleteLoading(false);
      setRefresh((p) => !p);
      setDeletingId('');
    });
  };

  // Define function to handle editing an employee
  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
    setShow(true);
  };

  const filteredEmployees = filter
    ? employees.filter((employee) =>
        employee.employeeType.toLowerCase().includes(filter.toLowerCase())
      )
    : employees;

  // Define useEffect hook to fetch all employees from the server
  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/employees')
      .then((res) =>
        res.json().then((data) => {
          if (Array.isArray(data)) {
            setEmployees(data);
          }
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [refresh]);

  return (
    <div className="table_screen">
      {/* header section */}
      <header className="header ps-0 ms-0">
        <h1 className="ps-0 ms-0">
          People{' '}
          {isLoading && (
            <div class="spinner-border text-dark" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
        </h1>
      </header>
      {/* filtering and adding section */}
      <div className="mb-3 d-flex justify-content-end">
        <select
          className="form-select"
          aria-label="Employee types"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">All Employee types</option>
          <option value="Full Time">Full time</option>
          <option value="Part Time">Part time</option>
          <option value="Contract Basis">Contract basis</option>
          <option value="Other">Other</option>
        </select>
        <>
          {/* button to add a new employee */}
          <Button
            variant="primary"
            onClick={() => {
              setEditEmployee(null);
              setShow(true);
            }}
          >
            Add People
          </Button>

          {/* button to refresh the employee list */}
          <Button
            disabled={isLoading}
            variant="success"
            onClick={() => setRefresh((p) => !p)}
          >
            Refresh
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add People</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EmployeeForm
                onCancel={handleClose}
                onAddEmployee={props.onAddEmployee}
                editEmplyee={editEmplyee}
              />
            </Modal.Body>
          </Modal>
        </>
      </div>
      {/* table section */}
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>
              Display Name
              <button
                className="btn btn-link"
                onClick={() => handleSort('displayName')}
              >
                <i
                  className={`bi bi-caret-${
                    sortColumn === 'displayName'
                      ? sortOrder === 'asc'
                        ? 'down'
                        : 'up'
                      : 'down'
                  }`}
                ></i>
              </button>
            </th>

            <th>Emp ID</th>
            <th>Designation</th>
            <th>Emp Type</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* employee data rows */}
          {filteredEmployees?.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.nameWithInitials}</td>
              <td>{employee._id.substring(4, 10)}</td>
              <td>{employee.designation}</td>
              <td>{employee.employeeType}</td>
              <td>{employee.experience}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEditEmployee(employee)}
                >
                  Edit
                </button>
                <button
                  disabled={isDeleteLoading}
                  className={`btn btn-danger`}
                  onClick={() => handleDeleteEmployee(employee._id)}
                >
                  {' '}
                  Delete
                  {isDeleteLoading && deletingId === employee._id && (
                    <div
                      class="spinner-border spinner-border-sm"
                      role="status"
                    ></div>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeTable;
