import backgroundStyles from '../../../styles/background.css';

function AuthContentBackground({ children }) {
    return <div className={'content'}>{children}</div>;
}

export const links = () => {
    return [{ rel: "stylesheet", href: backgroundStyles }];
};


export default AuthContentBackground;
