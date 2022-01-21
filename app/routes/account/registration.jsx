import { Link } from 'remix';

function AccountRegister() {
    return (
        <div>
            <h1>Register</h1>
            <Link to={'/account/login'}>Login</Link>
        </div>
    )
}

export default AccountRegister;
