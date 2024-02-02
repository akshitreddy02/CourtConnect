import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../App.css';

const Judge = () => {
    const [acceptedCases, setAcceptedCases] = useState([]);
    const [judgmentInput, setJudgmentInput] = useState('');
    const navigate = useNavigate();
    const fetchAcceptedCases = async () => {
        try {
            const response = await axios.get('http://localhost:3008/accepted-cases');
            setAcceptedCases(response.data);
        } catch (error) {
            console.error('Error fetching accepted cases:', error);
        }
    };
    useEffect(() => {

        fetchAcceptedCases();
    }, []);

    const handleLogout = () => {
        navigate('/login');

    };

    const handleJudgmentSubmit = async (caseId) => {
        if (judgmentInput.trim() === '') {
            alert('Please enter the judgement')
            return;
        }
        try {
            await axios.patch(`http://localhost:3008/accepted-cases/${caseId}`, {
                judgment: judgmentInput,
            });
            console.log('Judgment submitted successfully');

            // Optionally, update the UI or perform other actions
            // For example, you might want to clear the judgment input field
            setJudgmentInput('');

            // Trigger re-fetch of accepted cases
            fetchAcceptedCases();
        } catch (error) {
            console.error('Error submitting judgment:', error);
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h1 className='display-4 fw-bold'>
                <FontAwesomeIcon icon={faGavel} className="me-2" />
                Judge Portal</h1>
            <h2>Case List</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Case Name</th>
                        <th>Case Description</th>
                        <th>Document</th>
                        <th>Judgment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {acceptedCases.map((caseItem) => (
                        <tr key={caseItem._id}>
                            <td>{caseItem.caseName}</td>
                            <td>{caseItem.caseDescription}</td>
                            <td><a href={"http://localhost:3008/files/" + caseItem.clientid}>{caseItem.filename}</a></td>
                            <td>{caseItem.judgment || 'No Judgment'}</td>
                            <td>
                                {caseItem.judgment ? (
                                    <span className="badge bg-success">Done</span>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleJudgmentSubmit(caseItem._id)}
                                    >
                                        Submit Judgment
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Input field for judgment */}
            <div className="mt-3">
                <label htmlFor="judgmentInput" className="form-label">Enter Judgment:</label>
                <textarea
                    id="judgmentInput"
                    className="form-control"
                    value={judgmentInput}
                    onChange={(e) => setJudgmentInput(e.target.value)}
                />
            </div>
            <button className="btn btn-danger mt-3 mx-auto d-block" onClick={handleLogout}>Logout</button>

        </div>
    );
};

export default Judge;
