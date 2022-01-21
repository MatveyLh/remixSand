import {Form, redirect} from "remix";
import {destroySession, getSession} from "~/sessions";

export async function action({ request }) {
    const session = await getSession(request.headers.get('Cookie'));

    return redirect('/account/login', {
        headers: {
            'Set-Cookie': await destroySession(session),
        }
    })
}

export async function loader({ request }) {
    const session = await getSession(
        request.headers.get('Cookie'),
    )

    if (!session.has('userId')) {
        return redirect('/account/login');
    }

    return null;
}

export default function Index() {
  return (
    <div>
      <Form action={'/weather'} method={'get'}>
        City: <input type={'text'} name={'city'} />
        <input type={'submit'} value={'Fetch weather'} />
      </Form>
        <Form method={'post'}>
            <button>Logout</button>
        </Form>
    </div>
  );
}


