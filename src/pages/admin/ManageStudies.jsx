import { useState, useEffect } from 'react';

const ManageStudies = () => {
    const [studies, setStudies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudies();
    }, []);

    const fetchStudies = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/studies/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                setStudies(data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteStudy = async (id) => {
        if (!window.confirm('Are you sure you want to delete this study?')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/studies/admin/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                setStudies(studies.filter((study) => study._id !== id));
            } else {
                alert('Failed to delete study');
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h1>Manage Studies</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {studies.map((study) => (
                        <tr key={study._id}>
                            <td>{study._id}</td>
                            <td>{study.title}</td>
                            <td>{study.user?.email || 'Unknown'}</td>
                            <td>{study.status}</td>
                            <td>
                                <button onClick={() => deleteStudy(study._id)} style={{ color: 'red' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageStudies;
