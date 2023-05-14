// Importing the useState hook
import { useState } from 'react';

//Creating the AddEmployeeForm component with props parameter
function AddEmployeeForm(props) {
  //Defining the state values for all the input fields
  const [fullName, setFullName] = useState(props.editEmplyee?.fullName || '');
  const [nameWithInitials, setNameWithInitials] = useState(
    props.editEmplyee?.nameWithInitials || ''
  );
  const [preferredName, setPreferredName] = useState(
    props.editEmplyee?.preferredName || ''
  );
  const [gender, setGender] = useState(props.editEmplyee?.gender || '');
  const [dateOfBirth, setDateOfBirth] = useState(
    props.editEmplyee?.dateOfBirth || ''
  );
  const [email, setEmail] = useState(props.editEmplyee?.email || '');
  const [mobileNumber, setMobileNumber] = useState(
    props.editEmplyee?.mobileNumber || ''
  );
  const [designation, setDesignation] = useState(
    props.editEmplyee?.designation || ''
  );
  const [employeeType, setEmployeeType] = useState(
    props.editEmplyee?.employeeType || ''
  );
  const [joinedDate, setJoinedDate] = useState(
    props.editEmplyee?.joinedDate || ''
  );
  const [experience, setExperience] = useState(
    props.editEmplyee?.experience || ''
  );
  const [salary, setSalary] = useState(props.editEmplyee?.salary || '');
  const [personalNotes, setPersonalNotes] = useState(
    props.editEmplyee?.personalNotes || ''
  );

  // Handling changes in the input fields
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

  const handleJoinedDateChange = (event) => {
    setJoinedDate(event.target.value);
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

  // Handling the cancel button click
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

  // Handling the submit button click
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

    fetch(
      `http://localhost:5000/employees${
        props.editEmplyee ? `/${props.editEmplyee._id}` : ''
      }`,
      {
        method: props.editEmplyee ? 'PUT' : 'POST',
        body: JSON.stringify(newEmployee),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    props.onCancel();

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
      {/* Full Name input */}
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

      {/* Name with Initials*/}
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
        {/* Preferred/Display Name inputs*/}
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

      {/* Gender inputs*/}
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

        {/* Date of Birth inputs*/}
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

      {/* email inputs*/}
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

        {/* Mobile Number inputs*/}
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

      {/* Designation inputs*/}
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

        {/* Employee Type inputs*/}
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

      {/* Joined date inputs*/}
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

        {/* Experience inputs*/}
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

      {/* Salary inputs*/}
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

      {/* Personal Notes inputs*/}
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
          {props.editEmplyee ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
}

export default AddEmployeeForm;
