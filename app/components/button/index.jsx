import accountButtonStyles from '../../styles/button.css';
import authFormStyles from "~/styles/authFormStyles.css";

function AccountButton({ variant = 'outline', size = 'main', border = 'dark', children, href, as, fullWidth = true, disabled = false, loader, isActive, ...rest }) {
    return (
        <button
            className={'button'}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}

export const links = () => {
    return [{ rel: "stylesheet", href: accountButtonStyles }];
};

export default AccountButton
