import React, { useEffect, useState } from 'react';
import './StudentList.css';
import Sidebar from './Sidebar';
import Header from './Header';
import StudentCard from './StudentCard';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch('http://localhost:5000/api/students/all');
            const data = await response.json();
            setStudents(data);
        };

        fetchStudents();
    }, []);

    const addStudent = () => {
        navigate('/students');
    };

    return (
        <div className="appp">
            <Sidebar />
            <div className="main-contentt">
                <Header />
                <div className="student-section">
                    <br></br>
                    <h2>Students</h2>
                    <div className="student-list">
                        {students.map((student) => (
                            <StudentCard key={student.id} student={student} />
                        ))}
                    </div>
                    <button className="add-student-button" onClick={addStudent}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentList;
