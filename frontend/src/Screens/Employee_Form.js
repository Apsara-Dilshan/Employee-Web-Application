import { useState } from 'react';

function AddEmployeeForm(props) {
  const [fullName, setFullName] = useState('');
  const [nameWithInitials, setNameWithInitials] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const [joinedDate, setJoinedDate] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [personalNotes, setPersonalNotes] = useState('');

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleNameWithInitialsChange = (event) => {
    setNameWithInitials(event.target.value);
  };

  const handlePreferredNameChange = (event) => {
    setPreferredName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleEmployeeTypeChange = (event) => {
    setEmployeeType(event.target.value);
  };

  const handleJoinedDateChange = (date) => {
    setJoinedDate(date);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };
  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handlePersonalNotesChange = (event) => {
    setPersonalNotes(event.target.value);
  };

  const handleCancel = () => {
    setFullName('');
    setNameWithInitials('');
    setPreferredName('');
    setGender('');
    setDateOfBirth('');
    setEmail('');
    setMobileNumber('');
    setDesignation('');
    setEmployeeType('');
    setJoinedDate('');
    setExperience('');
    setSalary('');
    setPersonalNotes('');
    props.onCancel();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newEmployee = {
      fullName: fullName,
      nameWithInitials: nameWithInitials,
      preferredName: preferredName,
      gender: gender,
      dateOfBirth: dateOfBirth,
      email: email,
      mobileNumber: mobileNumber,
      designation: designation,
      employeeType: employeeType,
      joinedDate: joinedDate,
      experience: experience,
      salary: salary,
      personalNotes: personalNotes,
    };

    props.onAddEmployee(newEmployee);

    // clear form fields
    setFullName('');
    setNameWithInitials('');
    setPreferredName('');
    setGender('male');
    setDateOfBirth('');
    setEmail('');
    setMobileNumber('');
    setDesignation('');
    setEmployeeType('');
    setJoinedDate('');
    setExperience('');
    setSalary('');
    setPersonalNotes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Full Name <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          placeholder="enter full name"
          value={fullName}
          onChange={handleFullNameChange}
          required
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="nameWithInitials" className="form-label">
            Name with Initials <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="nameWithInitials"
            placeholder="enter name with initials"
            value={nameWithInitials}
            onChange={handleNameWithInitialsChange}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="preferredName" className="form-label">
            Preferred/ Display Name
          </label>
          <input
            type="text"
            className="form-control"
            id="preferredName"
            placeholder="enter name"
            value={preferredName}
            onChange={handlePreferredNameChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="form-select"
            id="gender"
            aria-label="Select Gender"
            value={gender}
            onChange={handleGenderChange}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="col">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobileNumber"
            placeholder="mobile number"
            required
            value={mobileNumber}
            onChange={handleMobileNumberChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="designation" className="form-label">
            Designation
          </label>
          <input
            type="text"
            className="form-control"
            id="designation"
            placeholder="Designation"
            required
            value={designation}
            onChange={handleDesignationChange}
          />
        </div>
        <div className="col">
          <label htmlFor="employeeType" className="form-label">
            Employee Type
          </label>
          <select
            className="form-select"
            id="employeeType"
            value={employeeType}
            onChange={handleEmployeeTypeChange}
          >
            <option value="">Select Employee Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract Basis">Contract Basis</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="joinedDate" className="form-label">
            Joined Date
          </label>
          <input
            type="date"
            className="form-control"
            id="joinedDate"
            placeholder="joined date"
            value={joinedDate}
            onChange={handleJoinedDateChange}
            required
          />
        </div>

        <div className="col">
          <label htmlFor="experience" className="form-label">
            Experience
          </label>
          <select
            className="form-select"
            id="experience"
            value={experience}
            onChange={handleExperienceChange}
          >
            <option value="">Select experience</option>
            {[...Array(10)].map((_, index) => {
              const experience = (index + 1).toString().padStart(2, '0');
              return (
                <option key={index + 1} value={experience}>
                  {experience} Year{experience > 1 ? 's' : ''}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            type="number"
            className="form-control"
            id="salary"
            placeholder="Salary"
            required
            value={salary}
            onChange={handleSalaryChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="personalNotes" className="form-label">
          Personal Notes
        </label>
        <textarea
          className="form-control"
          id="personalNotes"
          rows="3"
          placeholder="personal notes"
          value={personalNotes}
          onChange={handlePersonalNotesChange}
        />
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Add People
        </button>
      </div>
    </form>
  );
}

export default AddEmployeeForm;
