import {useState} from "react";
import {LayoutAccountAuth} from "~/components/layout";
import AuthSubstrate from "~/components/substrate";
import AuthBackground from "~/components/background";
import Background from '../../../public/images/adminAccountLoginBanner.jpg';
import BackgroundWebp from '../../../public/images/adminAccountLoginBanner.webp';
import AuthContentBackground from "~/components/auth/background";
import loginStyles from '~/styles/login.css';
import coreStyles from '~/styles/core.css';
import AuthForm from "~/components/auth/form";
import {
    links as substrateLinks
} from '../../components/substrate';
import {
    links as buttonLinks
} from '../../components/button/index'
import {
    links as inputLinks
} from '../../components/input'
import {
    links as backgroundLinks
} from '../../components/auth/background/index'
import {
    links as formLinks
} from '../../components/auth/form/index'
import {redirect} from "remix";
import { getSession, commitSession } from "~/sessions";


export async function action({ request }) {
    const body = await request.formData();
    const session = await getSession(
        request.headers.get("Cookie")
    );

    const email = body.get('email');
    const password = body.get('password');

    if (email === 'test@m.ru' && password === '123') {
        const userId = '123';
        await session.set('userId', userId);

        return redirect('/', {
            headers: {
                "Set-Cookie": await commitSession(session)
            }
        });
    }

    return { success: false, message: 'unknown user', errors: [{password: 'Wrong email or password'}] };
}

export async function loader({ request }) {
    const session = await getSession(
        request.headers.get('Cookie'),
    )

    if (session.has('userId')) {
        return redirect('/');
    }

    return null;
}

function AccountLogin() {
    const [errors, setErrors] = useState([]);

    const authMethodData = [
        {
            title: 'Login with QR-code',
            link: '/account/login/qr-code',
        },
    ];

    const formInputsData = [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Email',
            required: true,
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            required: true,
        },
    ];

    const formInfo = {
        submitButtonInfo: {
            buttonText: 'Login',
            buttonVariant: 'outline',
            buttonBorder: 'light',
            buttonSize: 'main',
        },
        page: 'logIn',
        formTitle: 'Log In',
        additionalInfo: true,
        logo: true,
        titleLink: {
            text: 'Register',
            link: '/account/registration',
        },
    };

    function handleSubmitLoginForm() {}

    return (
        <LayoutAccountAuth>
            <section>
                <AuthSubstrate>
                    <AuthBackground backgroundImage={Background} backgroundImageWebp={BackgroundWebp} />
                    <AuthContentBackground>
                        <div className={'formInner'}>
                            <AuthForm handleSubmitForm={handleSubmitLoginForm} authMethodData={authMethodData} errors={errors} formInputsData={formInputsData} formInfo={formInfo} />
                        </div>
                    </AuthContentBackground>
                </AuthSubstrate>
            </section>
        </LayoutAccountAuth>
    )
}

export const links = () => {
    return [
        ...substrateLinks(),
        ...buttonLinks(),
        ...inputLinks(),
        ...backgroundLinks(),
        ...formLinks(),
        { rel: "stylesheet", href: loginStyles },
        { rel: "stylesheet", href: coreStyles },
    ];
};
export default AccountLogin;
