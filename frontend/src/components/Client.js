import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Client = () => {
    const [caseDescription, setCaseDescription] = useState('');
    const [existingCase, setExistingCase] = useState(null);
    const [lawyers, setLawyers] = useState([]);
    const [selectedLawyerId, setSelectedLawyerId] = useState(null);

    const { state } = useLocation();
    const clientid = state?.clientid;
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    useEffect(() => {
        // Fetch existing case data when the component mounts
        const fetchExistingCase = async () => {
            try {
                const response = await axios.get(`http://localhost:3008/cases?clientid=${clientid}`);
                const existingCaseData = response.data;
                setExistingCase(existingCaseData);
            } catch (error) {
                console.error('Error fetching existing case:', error);
            }
        };

        // Fetch the list of lawyers when the component mounts
        const fetchLawyers = async () => {
            try {
                const response = await axios.get('http://localhost:3008/lawyers');
                setLawyers(response.data);
            } catch (error) {
                console.error('Error fetching lawyers:', error);
            }
        };

        fetchExistingCase();
        fetchLawyers();
    }, [clientid]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if a lawyer is selected
        if (!selectedLawyerId) {
            console.log('Please select a lawyer');
            return;
        }

        // Check if the client already has a booked case
        if (existingCase) {
            console.log('You already have a booked case:', existingCase);
            // You can handle this case as needed, e.g., show a message
        } else {
            // Handle form submission, e.g., make an API request
            try {
                const response = await axios.post('http://localhost:3008/cases', {
                    caseDescription,
                    clientid,
                    lawyerid: selectedLawyerId,
                });
                // Process the response or update the UI as needed
                console.log('Response:', response.data);

                // After submitting a new case, update the existingCase state
                setExistingCase(response.data);
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
            }
        }
    };

    const handleDeleteExistingCase = async (caseId) => {
        try {
            await axios.delete(`http://localhost:3008/lawyer-cases/${caseId}`);
            setExistingCase(null);
            console.log('Existing case deleted successfully');
        } catch (error) {
            console.error('Error deleting existing case:', error);
        }
    };

    return (
        <div className="container mt-5">
            <header className="mb-4 text-center">
                <h1><i className="fas fa-balance-scale me-2"></i> Client Portal</h1>
            </header>

            <main>
                {existingCase ? (
                    <div>
                        <h2>Your Existing Case:</h2>
                        <table className="table table-hover shadow">
                            <thead>
                                <tr>
                                    <th>Case Description</th>
                                    <th>Judgment</th>
                                    {/* Add other table headers for existing case data */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{existingCase.caseDescription}</td>
                                    <td>{existingCase.judgment || 'No Judgment'}</td>
                                    {/* Add other table cells for existing case data */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="caseDescription" className="form-label">Case Description:</label>
                            <textarea
                                id="caseDescription"
                                name="caseDescription"
                                className="form-control"
                                value={caseDescription}
                                onChange={(e) => setCaseDescription(e.target.value)}
                            />
                        </div>
                        {/* Add dropdown to select a lawyer */}
                        <div className="mb-3">
                            <label htmlFor="lawyer" className="form-label">Select a Lawyer:</label>
                            <select
                                id="lawyer"
                                name="lawyer"
                                className="form-select"
                                value={selectedLawyerId}
                                onChange={(e) => setSelectedLawyerId(e.target.value)}
                            >
                                <option value="">Select a Lawyer</option>
                                {lawyers.map((lawyer) => (
                                    <option key={lawyer.lawyerid} value={lawyer.lawyerid}>
                                        {lawyer.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Case</button>
                    </form>
                )}
                {existingCase && existingCase.judgment !== null && (
                    <button className="btn btn-warning mt-3" onClick={() => handleDeleteExistingCase(existingCase._id)}>
                        New Case
                    </button>
                )}
                <button className="btn btn-danger mt-3 mx-auto d-block" onClick={handleLogout}>Logout</button>
            </main>
        </div>
    );
};

export default Client;
