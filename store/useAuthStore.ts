import { create } from "zustand";
import { persist } from "zustand/middleware";


export type UserRole = 'ADMIN' | "USER"

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole
};

type AuthState = {
    users: User[];
    user: User | null;
    token: string | null;

    register: (name: string, email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            users: [],
            user: null,
            token: null,

            register: (name, email, password) => {
                const users = get().users;

                // prevent duplicate email
                if (users.find((u) => u.email === email)) {
                    alert("Email already registered!");
                    return;
                }

                const newUser: User = {
                    id: Date.now().toString(),
                    name,
                    email,
                    password,
                    role: email.toLowerCase().includes('admin') ? "ADMIN" : "USER",
                };

                set({ users: [ ...users, newUser ] });
                alert("Registration successful! You can now log in.");
            },

            login: (email, password) => {
                const { users } = get();
                const foundUser = users.find(
                    (u) => u.email === email && u.password === password
                );

                if (!foundUser) {
                    alert("Invalid credentials!");
                    return;
                }

                foundUser.role = email.toLowerCase().includes('admin') ? "ADMIN" : "USER"

                set({
                    user: foundUser,
                    token: "local-token-" + foundUser.id,
                });
            },

            logout: () => set({ user: null, token: null }),
        }),
        { name: "auth-storage" }
    )
);
