// lib/auth.ts
export async function getCurrentUser() {
    // This is mock data - replace with your actual authentication logic
    // In a real app, you would get the user from a session or token
    return {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        coins: 150,
        avatar: null
    };
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}