import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import EmployeeForm from './Employee_Form';

function EmployeeTable(props) {
  const [employees, setEmployees] = useState(props.employees || []);
  const [filter, setFilter] = useState('');
  const [show, setShow] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const filteredEmployees = filter
    ? employees.filter((employee) =>
        employee.employeeType.toLowerCase().includes(filter.toLowerCase())
      )
    : employees;

  return (
    <div className="table_screen">
      <header className="header">
        <h1>People</h1>
      </header>
      <div className="mb-3 d-flex justify-content-end">
        <select
          className="form-select"
          aria-label="Employee types"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">Employee types</option>
          <option value="full-time">Full time</option>
          <option value="part-time">Part time</option>
          <option value="contract-basis">Contract basis</option>
          <option value="other">Other</option>
        </select>
        <>
          <Button variant="primary" onClick={handleShow}>
            Add People
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add People</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EmployeeForm
                onCancel={handleClose}
                onAddEmployee={props.onAddEmployee}
              />
            </Modal.Body>
          </Modal>
        </>
      </div>
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
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.id}</td>
              <td>{employee.designation}</td>
              <td>{employee.type}</td>
              <td>{employee.experience}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => props.onEditEmployee(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  Delete
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
