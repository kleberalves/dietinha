import { API_RECAPTCHA, screens, stores } from "./config.service";
import { showConfirm, showError, showOk, showWarning } from "../lib/message.lib";
import { store } from "./store.service";
import { useRequest } from "../lib/request";
import { localISOString } from "../lib/treatments";
import { swapScreen } from "../lib/screens.lib";

declare var grecaptcha: ReCaptchaV2.ReCaptcha;

const send = (email: string, senha: string, token: string): Promise<string> => {

    let promise = new Promise<string>((resolve, reject) => {

        const { post } = useRequest();

        post(`/login/create-user/${token}`, {
            "email": email,
            "password": senha
        }).then(async (resp) => {

            let autoInfo: AuthInfo = {
                email: email,
                name: resp.name,
                token: resp.token,
                profiles: resp.profiles
            } as AuthInfo

            store.updateSingle<AuthInfo>(stores.Login, autoInfo);

            resolve("ok");

        }).catch((e) => {
            //TODO Adicionar tratamento de erros Global
            globalErrors(e);
            reject();
        });

    });

    return promise;
}

export const sendActive = (): Promise<void> => {


    let promise = new Promise<void>((resolve, reject) => {
        let loginInfo = getLoginInfo();

        if (loginInfo && loginInfo.activeToken) {
            getTokenRecaptcha((token) => {

                const { put } = useRequest();
                put(`/login/activate/${token}`, {
                    "token": loginInfo.activeToken
                }).then(async (resp) => {
                    resolve();
                }).catch((e) => {
                    //TODO Adicionar tratamento de erros Global
                    globalErrors(e);
                    reject();
                });
            });
        } else {
            reject();
        }

    });

    return promise;
}


export const resetPassword = (password: string, email: string): void => {
    let loginInfo = getLoginInfo();
    if (loginInfo && loginInfo.activeToken) {
        getTokenRecaptcha((captchaToken) => {
            const { put } = useRequest();
            put(`/login/reset-password/${captchaToken}`,
                {
                    "token": loginInfo.activeToken,
                    "password": password,
                    "email": email
                }
            ).then(async (resp) => {
                showOk("Sua senha foi alterada com sucesso!");
                swapScreen(screens.Login);
            }).catch((e) => {
                //TODO Adicionar tratamento de erros Global
                globalErrors(e);
            });
        });
    } else {
        showError("Active token não encontrado.")
    }
}

export const sendResetPassword = (email: string): void => {
    getTokenRecaptcha((token) => {
        const { get } = useRequest();
        get(`/login/send-reset-password/${email}/${token}`).then(async (resp) => {
            showOk("Enviamos um link para o seu email com o procedimento para redefinir a sua senha.")
        }).catch((e) => {
            //TODO Adicionar tratamento de erros Global
            globalErrors(e);
        });
    });
}

export const logout = () => {
    // O Logout não deve excluir os demais dados pois o app poderá funcionar offline
    store.clearAll(stores);
}

export const setGuest = (): void => {
    store.updateSingle(stores.Login, { email: "guest" } as AuthInfo);
}

export const setActiveToken = (token: string, mode: string): void => {
    store.updateSingle(stores.Login, {
        activeToken: token,
        activeTokenMode: mode
    } as AuthInfo);
}

export const updateLastSync = (): Date => {
    let date = localISOString();
    store.updateSingle(stores.Login, { lastSync: date } as AuthInfo);
    return new Date(date);
}

export const getLoginInfo = (): AuthInfo | null => {
    return store.getSingle<AuthInfo>(stores.Login);
}

export const getLastSync = (): string | undefined => {
    let login = store.getSingle<AuthInfo>(stores.Login);
    if (login && login.lastSync) {
        return login.lastSync
    }
    return undefined;
}

export const login = (email: string, senha: string): Promise<void> => {

    let promise = new Promise<void>((resolve, reject) => {

        getTokenRecaptcha((token) => {
            send(email, senha, token).then((ok) => {
                resolve();
            }).catch(() => {
                reject();
            });
        });

    });

    return promise;
}


const getTokenRecaptcha = (func: (token: string) => void) => {
    grecaptcha.ready(() => {
        grecaptcha.execute(API_RECAPTCHA, { action: 'submit' }).then((token) => {
            func(token);
            // Add your logic to submit to your backend server here.
        }, (err) => {
            showError(err.message)
            console.log(err);
        });
    });
}

export const globalErrors = (e) => {
    if (e.error) {
        if (e.error.name === "TokenExpiredError") {
            showWarning("Autenticação expirada.");
            swapScreen(screens.Login);
            logout();
        } else if (e.error.name === "UnauthorizedError") {
            let loginInfo = getLoginInfo();

            if (loginInfo === null || (loginInfo && loginInfo.email !== "guest")) {
                showConfirm("Você está usando como visitante anônimo. Recomendamos que utilize o seu email com senha para sincronizar os seus dados na nossa nuvem. Gostaria de fazer isso agora?", () => {
                    swapScreen(screens.Login);
                });

                setGuest();
            }
        } else {
            showWarning(e.error.message);
        }
    } else {
        showWarning(e);
    }
}