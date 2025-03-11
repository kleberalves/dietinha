import { getInputInt, getInputNumber, getInputString, validateFields } from "../lib/forms";
import { LOGIN_STORE } from "./config.service";
import { showError, showOk, showWarning } from "../lib/message.lib";
import { store } from "./store.service";
import { useRequest } from "../lib/request";

declare var grecaptcha: ReCaptchaV2.ReCaptcha;

const sendCreate = (email: string, senha: string, token: string): Promise<string> => {

    let promise = new Promise<string>((resolve, reject) => {

        let items: any[] = store.getItems(LOGIN_STORE);

        let data: Dictionary[] = [];
        let conditions: Dictionary[] = [];

        const { post } = useRequest();

        post(`/login/create-user/${token}`, {
            "email": email,
            "password": senha
        }).then(async (resp) => {

            console.log("resp", resp);

            if (resp) {

                if (resp.error) {
                    console.log("resp Err", resp);
                } else {
                    console.log("resp OK", resp);

                    data.push({
                        key: "email",
                        value: email
                    });

                    data.push({
                        key: "senha",
                        value: senha
                    });

                    data.push({
                        key: "token",
                        value: resp.token
                    });


                    if (items.length > 0) {
                        conditions.push({
                            key: "id",
                            value: items[0].id
                        })
                    }

                    store.updateItemsByFields(LOGIN_STORE, conditions, data);

                    resolve("ok");
                }
            }

        }).catch((e) => {
            console.log(e);
            showWarning(e.error.message);
            reject("error");
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
                    grecaptcha.execute('6LcxsKoUAAAAANcv1ELzcW54Yh9SWoLuPMdSdStN', { action: 'submit' }).then((token) => {
                        if (email.value && senha.value) {
                            sendCreate(email.value, senha.value, token).then((ok) => {
                                resolve(ok);
                            }).catch((err) => {
                                reject(err);
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