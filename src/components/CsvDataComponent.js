import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const CsvDataComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/rawData.csv'); // Ensure this path is correct
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const reader = response.body.getReader();
                const result = await reader.read();
                const decoder = new TextDecoder('utf-8');
                const csvData = decoder.decode(result.value);
                console.log('CSV Data:', csvData);
                // Parse the CSV data
                Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        console.log('Parsed Results:', results.data); // Log the parsed results
                        setData(results.data);
                        setLoading(false);
                    },
                    error: (err) => {
                        console.error('Parsing Error:', err.message); // Log parsing errors
                        setError(err.message);
                        setLoading(false);
                    },
                });
            } catch (err) {
                console.error('Fetch Error:', err.message); // Log fetch errors
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>CSV Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Locality</th>
                        <th>Cost For Two</th>
                        <th>Cuisines</th>
                        <th>Avg Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.locality}</td>
                            <td>{item.costForTwo}</td>
                            <td>{item.cuisines}</td>
                            <td>{item.avgRating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CsvDataComponent;