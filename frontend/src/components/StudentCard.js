// StudentCard.js
import React from 'react';
import './StudentCard.css';

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <h3>{student.firstName} {student.lastName}</h3>
      <p>Email: {student.email}</p>
      <p>Enrollment Number: {student.enrollmentNumber}</p>
    </div>
  );
};

export default StudentCard;
