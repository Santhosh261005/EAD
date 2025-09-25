import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    name: '',
    rollNo: '',
    gender: '',
    department: '',
    section: '',
    skills: []
  });

  const [message, setMessage] = useState(null);
  const API = process.env.REACT_APP_API_URL || 'https://ead-project-jgrx.onrender.com';

  // Handle text/select input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle checkbox (skills) changes
  const handleSkills = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((s) => s !== value)
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch(`${API}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');

      setMessage('✅ Student saved successfully!');
      setForm({ name: '', rollNo: '', gender: '', department: '', section: '', skills: [] });
    } catch (err) {
      setMessage('❌ ' + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration</h2>
      {message && <p className="msg">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* Roll No */}
        <label>Roll No</label>
        <input
          name="rollNo"
          type="text"
          value={form.rollNo}
          onChange={handleChange}
          required
        />

        {/* Gender */}
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={form.gender === 'Male'}
              onChange={handleChange}
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={form.gender === 'Female'}
              onChange={handleChange}
            />{' '}
            Female
          </label>
        </div>

        {/* Department */}
        <label>Department</label>
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
        >
          <option value="">--Select--</option>
          <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="AIDS">AIDS</option>
          <option value="CET">CET</option>
        </select>

        {/* Section */}
        <label>Section</label>
        <select
          name="section"
          value={form.section}
          onChange={handleChange}
          required
        >
          <option value="">--Select--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        {/* Skills */}
        <label>Skills</label>
        <div className="checkbox-group">
          {['C', 'C++', 'Java', 'JS', 'Ruby'].map((s) => (
            <label key={s}>
              <input
                type="checkbox"
                value={s}
                checked={form.skills.includes(s)}
                onChange={handleSkills}
              />{' '}
              {s}
            </label>
          ))}
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
