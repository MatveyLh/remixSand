export const LayoutAccountAuth = ({ children, headTitle = 'Page' }) => {
    return (
        <>
            <head>
                <title>{`Charge4go | ${headTitle}`}</title>
            </head>
            <main>{children}</main>
        </>
    );
};
