import React, { useEffect, useState } from 'react';
import './StudentList.css';
import Sidebar from './Sidebar';
import Header from './Header';
import StudentCard from './StudentCard';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch('http://localhost:5000/api/users/non-admin-users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setStudents(data);
        };

        fetchStudents();
    }, [token]);

    const addStudent = () => {
        navigate('/students');
    };

    // const handlePaymentAdded = () => {
    //     const fetchStudents = async () => {
    //         const response = await fetch('http://localhost:5000/api/students/all', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const data = await response.json();
    //         setStudents(data);
    //     };

    //     fetchStudents();
    // };

    return (
        <div className="appp">
            <Sidebar />
            <div className="main-contentt">
                <Header />
                <div className="student-section">
                    <br></br>
                    <h2>Users</h2>
                    <div className="student-list">
                        {students.map((student) => (
                            <StudentCard key={student._id} student={student}  />
                        ))}
                    </div>
{/*                     
                    <button className="add-student-button" onClick={addStudent}>
                        +
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default StudentList;
