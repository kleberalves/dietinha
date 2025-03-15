import { getInputInt, getInputNumber, getInputString, validateFields } from "../lib/forms";
import { API_RECAPTCHA, LOGIN_STORE } from "./config.service";
import { showError, showOk, showWarning } from "../lib/message.lib";
import { store } from "./store.service";
import { useRequest } from "../lib/request";

declare var grecaptcha: ReCaptchaV2.ReCaptcha;

const sendCreate = (email: string, senha: string, token: string): Promise<string> => {

    let promise = new Promise<string>((resolve, reject) => {

        let data: Dictionary[] = [];

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

            store.updateSingle<AuthInfo>(LOGIN_STORE, autoInfo);

            resolve("ok");

        }).catch((e) => {
            //TODO Adicionar tratamento de erros Global
            if (e.error) {
                showWarning(e.error.message);
            } else {
                showWarning(e);
            }
            reject();
        });

    });

    return promise;
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
                            sendCreate(email.value, senha.value, token).then((ok) => {
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