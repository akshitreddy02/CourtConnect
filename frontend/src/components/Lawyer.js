import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Lawyer = () => {
    const [cases, setCases] = useState([]);
    const { state } = useLocation();
    const lawyerid = state?.lawyerid;
    const navigate = useNavigate();
    const fetchCases = async () => {
        try {
            const response = await axios.get(`http://localhost:3008/lawyer-cases?lawyerid=${lawyerid}`);
            setCases(response.data);
        } catch (error) {
            console.error('Error fetching cases:', error);
        }
    };
    useEffect(() => {
        // Fetch cases associated with the lawyer when the component mounts

        fetchCases();
    }, []);
    const handleLogout = () => {
        navigate('/');

    };
    const handleAccept = async (caseId) => {
        try {
            const response = await axios.patch(`http://localhost:3008/lawyer-cases/${caseId}`, {
                isaccepted: true,
            });
            // Update the UI or perform any other actions based on the response
            console.log('Case accepted:', response.data);
            fetchCases();
        } catch (error) {
            console.error('Error accepting case:', error);
        }
    };

    const handleDecline = async (caseId) => {
        try {
            await axios.delete(`http://localhost:3008/lawyer-cases/${caseId}`);
            // Update the UI or perform any other actions after deleting the case
            console.log('Case declined and deleted successfully');
            // Optionally, refetch the cases to update the list
            // const updatedCases = cases.filter((c) => c._id !== caseId);
            // setCases(updatedCases);
            fetchCases();
        } catch (error) {
            console.error('Error declining case:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lawyer Portal</h1>
            <h2>Case List</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Case Description</th>
                        <th>Judgment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((caseItem) => (
                        <tr key={caseItem._id}>
                            <td>{caseItem.caseDescription}</td>
                            <td>{caseItem.judgment || 'No Judgment'}</td>
                            <td>
                                {caseItem.isaccepted ? (
                                    <span className="badge bg-success">Accepted</span>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => handleAccept(caseItem._id)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDecline(caseItem._id)}
                                        >
                                            Decline
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-danger mt-3 mx-auto d-block" onClick={handleLogout}>Logout</button>

        </div>
    );
};

export default Lawyer;
