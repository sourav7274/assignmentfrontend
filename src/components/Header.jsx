import { useLocation, Link } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    // Check if the current location is not '/admin'
    const isAdminPage = location.pathname.includes('/admin');

    return (
        <>
            {!isAdminPage && (
                <header className="bg-dark text-light p-4 d-flex justify-content-between align-items-end">
                    <p className="mb-0">This is the header section</p>
                    <Link to="/admin" className="btn btn-light">To Admin</Link>
                </header>
            )}
        </>
    );
};

export default Header;
