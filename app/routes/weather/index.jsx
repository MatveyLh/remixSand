import {redirect, useLoaderData} from "remix";
import axios from "axios";
import { Outlet } from "remix";
import weatherStyles from '../../styles/weather.css';
import Title from "~/components/h1";

function Weather() {
    const data = useLoaderData();

    return (
        <>
            <Title />
            <div>
                <h1>{data?.city}</h1>
                <h2>{data?.type}</h2>
                <h3>Temperature: {data?.temp} °C</h3>
            </div>
            <Outlet />
        </>
    )
}

export default Weather;

export const links = () => {
    return [{
        rel: 'stylesheet', href: weatherStyles
    }]
}

export async function loader({ request }) {
    try {
        const url = new URL(request.url);
        const search = new URLSearchParams(url.search);

        if (!search.get('city')) {
            return redirect('/');
        }

        const city = search.get('city');
        const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.WEATHER_API_KEY}&units=metric`);

        return { city, type: res.data.weather[0].main, temp: res.data.main.temp };
    } catch (err) {
        console.error(err);

        redirect('/');
        return {}
    }

}

