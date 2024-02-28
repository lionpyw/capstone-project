

export interface Store {
    username: string;
    password: string;
    token: object;
    setToken: (token: object) => void;
    setUsername: (user: string | undefined) => void;
    setPassword: (pass: string) => void;
}
