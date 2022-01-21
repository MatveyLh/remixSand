import titleStyles from '../styles/weather.css';

function Title() {
    return <h1 className={'weather'}>Weather App</h1>
}

export const links = () => {
    return [{
        rel: 'stylesheet', href: titleStyles
    }]
}

export default Title

