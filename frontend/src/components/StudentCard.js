import React, { useState } from 'react';
import AddPayment from './AddPayment';
import './StudentCard.css';

const StudentCard = ({ student}) => {
    // const [showPaymentForm, setShowPaymentForm] = useState(false);

    // const checkPaymentWarning = () => {
    //     const lastPayment = student.payments[student.payments.length - 1];
    //     if (lastPayment) {
    //         const lastPaymentDate = new Date(lastPayment.date);
    //         const currentDate = new Date();
    //         const timeDiff = Math.abs(currentDate.getTime() - lastPaymentDate.getTime());
    //         const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    //         if (diffDays > 30) {
    //           return 'Payment due';
    //       }
    //   } else {
    //       return 'No payments made';
    //     }
    //     return '';
    // };

    // const handlePaymentButtonClick = () => {
    //     setShowPaymentForm(!showPaymentForm);
    // };

    // const handlePaymentAdded = () => {
    //     setShowPaymentForm(false);
    //     onPaymentAdded();
    // };

    // const lastPayment = student.payments[student.payments.length - 1];

    return (
        <div className="student-card">
            <div >
                <h3>{student.firstName} {student.lastName}</h3>
                <p>Email: {student.email}</p>
                {/* <p>Enrollment Number: {student.enrollmentNumber}</p> */}
                {/* <p style={{color:"red"}}>{checkPaymentWarning()}</p> */}
                {/* {lastPayment && (
                    <div className="last-payment-info">
                        <p>Last Payment: {lastPayment.amount} ILS on {new Date(lastPayment.date).toLocaleDateString()}</p>
                    </div>
                )} */}
            </div>
            
            {/* <button onClick={handlePaymentButtonClick}>
                {showPaymentForm ? 'Cancel' : 'Add Payment'}
            </button>
            {showPaymentForm && (
                <AddPayment studentId={student._id} onPaymentAdded={handlePaymentAdded} />
            )} */}
        </div>
    );
};

export default StudentCard;
