import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user || !user.isAdmin) {
        return null;
    }

    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: '#333', color: '#fff', padding: '1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img src="/src/assets/logo.png" alt="Multiverse Logo" style={{ height: '60px', borderRadius: '50%' }} />
                    <h3>Admin Panel</h3>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                    <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
                    <Link to="/admin/users" style={{ color: '#fff', textDecoration: 'none' }}>Manage Users</Link>
                    <Link to="/admin/studies" style={{ color: '#fff', textDecoration: 'none' }}>Manage Studies</Link>
                    <button onClick={logout} style={{ marginTop: 'auto', padding: '0.5rem', cursor: 'pointer', backgroundColor: '#d9534f', color: '#fff', border: 'none' }}>Logout</button>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f4f4f4' }}>
                <Outlet />
            </main>
        </div>
    );
};
export default AdminLayout;
