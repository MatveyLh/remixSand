export function login(email, password) {
    if (email === 'admin@m.ru' && password === '123') {
        return { success: true };
    }

    return { success: false, message: 'Unknown user' };
}
