import backgroundStyles from '../styles/background.css';
import Picture from "~/components/picture";
import loginStyles from "~/styles/login.css";

function AuthBackground({ backgroundImage, backgroundImageWebp }) {
    return (
        <div className={'background'}>
            <Picture src={backgroundImage} srcWebp={backgroundImageWebp} width={'100'} height={'100'} layout={'fill'} />
        </div>
    );
}

export const links = () => {
    return [{ rel: "stylesheet", href: backgroundStyles }];
};

export default AuthBackground;
