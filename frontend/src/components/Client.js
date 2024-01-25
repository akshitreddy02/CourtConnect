import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Client = () => {
    const [caseDescription, setCaseDescription] = useState('');
    const [existingCase, setExistingCase] = useState(null);
    const { state } = useLocation();
    const clientid = state?.clientid;
    const lawyerid = state?.lawyerid;

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

        fetchExistingCase();
    }, [clientid, lawyerid]);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    lawyerid,
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

    return (
        <>
            <header>
                <h1>
                    <i className="fas fa-balance-scale"></i> Client Portal
                </h1>
            </header>

            <main>
                {existingCase ? (
                    <div>
                        <h2>Your Existing Case:</h2>
                        <table>
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
                        <label htmlFor="caseDescription">Case Description :</label>
                        <textarea
                            id="caseDescription"
                            name="caseDescription"
                            value={caseDescription}
                            onChange={(e) => setCaseDescription(e.target.value)}
                        />
                        <button type="submit">Submit Case</button>
                    </form>
                )}
            </main>
        </>
    );
};

export default Client;
