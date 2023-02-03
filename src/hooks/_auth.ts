import axios from "axios";
import _data from "../_data";

interface UserData {
    email: string | null;
    iat: number | null;
}

export default class Auth {
    public isAuth = false;
    public token: string | null = null;
    private storageKey = "auth";
    public user: UserData = {
        email: null,
        iat: null,
    };
    constructor(
        callback: Function,
        isAuth: boolean,
        setIsAuth: Function,
        verify = true
    ) {
        this.isAuth = isAuth;
        const currentToken = localStorage.getItem(this.storageKey);
        if (currentToken) {
            this.token = currentToken;
            if (verify) {
                this.check().then((isAuthTmp) => {
                    setIsAuth(isAuthTmp);
                    this.isAuth = isAuthTmp;
                    if (!isAuthTmp) {
                        this.token = null;
                        localStorage.setItem(this.storageKey, "");
                    }
                    callback(this);
                });
            } else {
                callback(this);
            }
        } else {
            callback(this);
        }
    }
    private check(): Promise<boolean> {
        _data.jwtaxios.headers.Authorization = `Bearer ${this.token}`;
        return new Promise((resolve) => {
            axios
                .get(`${_data.API}/auth/jwt/verify`, _data.jwtaxios)
                .then((data) => {
                    this.user.email = data.data.email;
                    this.user.iat = data.data.iat;
                    resolve(true);
                })
                .catch(() => {
                    resolve(false);
                });
        });
    }

    public sign(
        email: string,
        password: string,
        isAuth: boolean,
        setIsAuth: Function
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `${_data.API}/auth/jwt/sign`,
                    {
                        email: email,
                        password: password,
                    },
                    _data.axios
                )
                .then((data) => {
                    this.token = data.data.token;
                    this.check().then((isAuthTmp) => {
                        setIsAuth(isAuthTmp);
                        this.isAuth = isAuthTmp;
                    });
                    localStorage.setItem(this.storageKey, `${this.token}`);
                    resolve(`${this.token}`);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    public signout(setIsAuth: Function) {
        localStorage.setItem(this.storageKey, "");
        setIsAuth(false);
        this.isAuth = false;
        this.token = null;
        this.user = {
            email: null,
            iat: null,
        };
    }
}
