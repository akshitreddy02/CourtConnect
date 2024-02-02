import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../App.css';

const Lawyer = () => {
    const [cases, setCases] = useState([]);
    const [editedDescriptions, setEditedDescriptions] = useState({});
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
        fetchCases();
    }, []);

    const handleLogout = () => {
        navigate('/login');
    };

    const handleAccept = async (caseId) => {
        try {
            const response = await axios.patch(`http://localhost:3008/lawyer-cases/${caseId}`, {
                isaccepted: true,
            });
            console.log('Case accepted:', response.data);
            fetchCases();
        } catch (error) {
            console.error('Error accepting case:', error);
        }
    };

    const handleDecline = async (caseId) => {
        try {
            await axios.delete(`http://localhost:3008/lawyer-cases/${caseId}`);
            console.log('Case declined and deleted successfully');
            fetchCases();
        } catch (error) {
            console.error('Error declining case:', error);
        }
    };

    const handleEditDescription = async (caseId, editedDescription) => {
        try {
            const response = await axios.patch(`http://localhost:3008/lawyer-cases/edit/${caseId}`, {
                caseDescription: editedDescription,
            });
            console.log('Case description edited successfully:', response.data);
            fetchCases();
        } catch (error) {
            console.error('Error editing case description:', error);
        }
    };


    return (
        <div className="container mt-5 text-center">
            <h1 className="display-4 fw-bold mb-4">
                <FontAwesomeIcon icon={faBalanceScale} className="me-2" />
                Lawyer Portal</h1>
            <h2>Case List</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Case Name</th>
                        <th>Case Description</th>
                        <th>Judgment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((caseItem) => (
                        <tr key={caseItem._id}>
                            <td>{caseItem.caseName}</td>
                            <td>
                                {caseItem.isaccepted ? (
                                    caseItem.caseDescription
                                ) : (
                                    <>
                                        <div className="mb-2">
                                            <strong>Original Description:</strong> {caseItem.caseDescription}
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor={`editDescription-${caseItem._id}`} className="form-label">Edit Description:</label>
                                            <input
                                                id={`editDescription-${caseItem._id}`}
                                                className="form-control"
                                                type="text"
                                                value={editedDescriptions[caseItem._id] || caseItem.caseDescription}
                                                onChange={(e) => handleEditDescription(caseItem._id, e.target.value)}
                                            />
                                        </div>
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={() => handleEditDescription(caseItem._id, editedDescriptions[caseItem._id] || caseItem.caseDescription)}
                                        >
                                            Submit Edit
                                        </button>
                                    </>
                                )}
                            </td>
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
