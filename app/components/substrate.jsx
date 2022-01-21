import substrateStyles from '../styles/substrate.css';

function AuthSubstrate({ children }) {
    return <div className={'substrate'}>{children}</div>;
}

export const links = () => {
    return [{
        rel: 'stylesheet', href: substrateStyles
    }]
}

export default AuthSubstrate;
