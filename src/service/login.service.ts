import { getInputString, validateFields } from "../lib/forms";
import { API_RECAPTCHA, stores } from "./config.service";
import { showError, showWarning } from "../lib/message.lib";
import { store } from "./store.service";
import { useRequest } from "../lib/request";
import { localISOString } from "../lib/treatments";

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

export const globalErrors = (e) => {
    if (e.error) {
        if (e.error.name === "TokenExpiredError") {
            showWarning("Autenticação expirada.");
            logout();
        } else {
            showWarning(e.error.message);
        }
    } else {
        showWarning(e);
    }
}

export const logout = () => {
    // O Logout não deve excluir os demais dados pois o app poderá funcionar offline
    store.clear(stores.Login);
}

export const updateLastSync = (): Date => {

    let date = localISOString();

    store.updateSingle(stores.Login, { lastSync: date } as AuthInfo);

    return new Date(date);
}

export const getLoginInfo = (): AuthInfo | null => {
    return store.getSingle<AuthInfo>(stores.Login);
}

export const getLastSync = (): string | undefined=> {
    let login = store.getSingle<AuthInfo>(stores.Login);
    if (login && login.lastSync) {
        return login.lastSync
    }
    return undefined
}

export const login = (): Promise<string> => {

    let promise = new Promise<string>((resolve, reject) => {

        let email = getInputString('#inputEmail', "Insira o seu email");
        let senha = getInputString('#inputSenha', "Insira a sua senha");

        try {
            if (validateFields([email, senha])) {

                grecaptcha.ready(() => {
                    grecaptcha.execute(API_RECAPTCHA, { action: 'submit' }).then((token) => {
                        if (email.value && senha.value) {
                            send(email.value, senha.value, token).then((ok) => {
                                resolve(ok);
                            }).catch((error) => {
                                reject(error);
                            });
                        }
                        // Add your logic to submit to your backend server here.
                    }, (err) => {
                        showError(err.message)
                        console.log(err);
                    });
                });
            }
        } catch (e: any) {
            showError(e.message);
        }
    });

    return promise;
}