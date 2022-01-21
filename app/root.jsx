import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";

export function meta() {
  return { title: "New Remix App" };
}

export default function App({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Oops!</title>
      </head>
      <body>
      <div>
        <h1>App Error | Alarm</h1>
        <pre>{error.message}</pre>
        <p>
          did you see your code? funny
        </p>
      </div>

      <Scripts />
      </body>
      </html>
  );
}
