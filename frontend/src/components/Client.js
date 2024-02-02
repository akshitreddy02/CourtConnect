import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../App.css';
const Client = () => {
    const [caseDescription, setCaseDescription] = useState('');
    const [existingCases, setExistingCases] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [caseName, setCaseName] = useState('');
    const [selectedLawyerId, setSelectedLawyerId] = useState('');
    const [file, setFile] = useState(null);
    const { state } = useLocation();
    const clientid = state?.clientid;
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };
    const fetchExistingCase = async () => {
        try {
            const response = await axios.get(`http://localhost:3008/cases?clientid=${clientid}`);
            console.log(response);
            const data = await response.data;

            if (data && data.length > 0) {
                // If existing cases are found, update the state
                setExistingCases(data);
            }
        } catch (error) {
            console.error('Error fetching existing case:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if a lawyer is selected
        if (!selectedLawyerId) {
            alert('Please select a lawyer');
            return;
        }
        if (caseDescription.trim() === '') {
            alert('Please enter the case description');
            return;
        }
        if (caseName.trim() === '') {
            alert('Please enter the case name');
            return;
        }

        const formData = new FormData();
        console.log(file)
        formData.append('file', file);
        formData.append('caseName', caseName);
        formData.append('caseDescription', caseDescription);
        formData.append('clientid', clientid);
        formData.append('lawyerid', selectedLawyerId);
        formData.append('filename', file.name);

        try {
            const response = await axios.post('http://localhost:3008/cases', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response.data);
            // After submitting a new case, update the existingCase state
            // setExistingCases(response.data);
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
        }
        fetchExistingCase();


    };

    useEffect(() => {
        // Fetch existing case data when the component mounts

        // Fetch the list of lawyers when the component mounts
        const fetchLawyers = async () => {
            try {
                const response = await axios.get('http://localhost:3008/lawyers');
                console.log(response.data)
                setLawyers(response.data);
            } catch (error) {
                console.error('Error fetching lawyers:', error);
            }
        };

        fetchExistingCase();
        fetchLawyers();
    }, []);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleNewCase = () => {
        // Reset the input fields
        setCaseName('');
        setCaseDescription('');
        setSelectedLawyerId('');
    };

    return (
        <div className="container mt-5 text-center">
            <header className="mb-4">
                <h1 className="display-4 fw-bold">
                    <i className="fas fa-user-circle me-2"></i>
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />Client Portal
                </h1>                </header>

            <main>
                <form onSubmit={handleSubmit} className='mb-4'>
                    <div className="mb-3">
                        <label htmlFor="caseName" className="form-label">Case Name:</label>
                        <input
                            type="text"
                            id="caseName"
                            name="caseName"
                            className="form-control"
                            value={caseName}
                            onChange={(e) => setCaseName(e.target.value)}
                        />
                    </div>
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
                    {/* File input for uploading documents */}
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">Upload Document:</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            className="form-control"
                            onChange={(e) => handleFileChange(e)}
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

                    <button type="submit" className="btn btn-primary me-2">Submit Case</button>
                </form>
                <button type="submit" className="btn btn-primary" onClick={handleNewCase}>New case</button>
                {existingCases && existingCases.length > 0 ? (
                    <div>
                        <h2>Your Existing Cases:</h2>
                        <table className="table table-hover shadow">
                            <thead>
                                <tr>
                                    <th>Case Name</th>
                                    <th>Case Description</th>
                                    <th>Judgment</th>
                                    <th>Media</th>
                                    {/* Add other table headers for existing case data */}
                                </tr>
                            </thead>
                            <tbody>
                                {existingCases.map((existingCase) => (
                                    <tr key={existingCase._id}>
                                        <td>{existingCase.caseName}</td>
                                        <td>{existingCase.caseDescription}</td>
                                        <td>{existingCase.judgment || 'No Judgment'}</td>
                                        <td><a href={"http://localhost:3008/files/" + existingCase.clientid}>{existingCase.filename}</a></td>
                                        {/* Add other table cells for existing case data */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}

                {/* {existingCase && existingCase.judgment !== null && (
                    <button className="btn btn-warning mt-3" onClick={() => handleDeleteExistingCase(existingCase._id)}>
                        New Case
                    </button>
                )} */}
                <button className="btn btn-danger mt-3 mx-auto d-block" onClick={handleLogout}>Logout</button>
            </main>
        </div>
    );
};

export default Client;
