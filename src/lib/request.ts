import { API_BASE_URL_SERVER, getenv, LOGIN_STORE } from "../service/config.service";
import { store } from "../service/store.service";
import { removeWindow, showLoading } from "./message.lib";

export const useRequest = (error?: any, logout?: () => void) => {

    const post = (url: string, body: any): Promise<any> => {
        return request(url, "POST", JSON.stringify(body));
    }

    const get = async (url: string): Promise<Response | undefined> => {

        try {
            return await request(url, "GET", null);
        } catch (message) {
            showError(message);
        }
    }

    const del = async (url: string): Promise<Response | undefined> => {

        try {
            return await request(url, "DELETE", null);
        } catch (message) {
            showError(message);
        }
    }

    const upload = async (url: string, file: any): Promise<Response | undefined> => {
        try {
            let formData = new FormData();
            await formData.append('image', file);
            return await request(url, "POST", formData, "");

        } catch (error) {
            showError(error);
        }

    }

    const put = async (url: string, body: any): Promise<Response | undefined> => {
        try {
            return await request(url, "PUT", JSON.stringify(body));

        } catch (error) {
            showError(error);
        }
    }

    const patch = async (url: string, body: any): Promise<Response | undefined> => {
        try {
            return await request(url, "PATCH", JSON.stringify(body));

        } catch (error) {
            showError(error);
        }
    }

    const showError = (obj: any) => {

        try {

            if (obj) {
                if (error) {

                    let msg = "";
                    if (obj.error) {
                        msg = obj.error.message;
                    } else {
                        msg = obj;
                    }

                    error(msg);

                    if (obj.error && logout) {
                        if (obj.error.statusCode == 401 || obj.error.statusCode == 403) {
                            logout();
                        }
                    }
                }
            }

        }
        catch (er) {
            console.log("er", er);
        }

    }

    const request = async (url: string,
        method: string,
        body: any = null,
        contentType: string = 'application/json'): Promise<any> => {

        return new Promise<any>(async (resolve, reject) => {

            let items: any[] = store.getItems(LOGIN_STORE);
            let token = undefined;

            if (items && items.length > 0) {
                token = items[0].token;
            }

            if (token) {
                if (url.indexOf("?") > 0) {
                    url = `${url}&`;
                } else {
                    url = `${url}?`;
                }
                url = `${url}access_token=${token}`;
            }
            let config = {
                method: method,
                headers: {}
            }

            if (contentType !== "") {
                config.headers = {
                    'Content-Type': contentType
                }
            }

            if (method !== "GET") {
                config["body"] = body;
            }

            showLoading();

            //Preferência para API_BASE_URL_SERVER caso esteja sendo executado no servidor
            //internamente redirecionará para BASE_URL se estiver no cliente
            fetch(`${getenv(API_BASE_URL_SERVER)}${url}`, config)
                .then((response) => {
                    //Tratamentos especiais para não estourar uma mensagem de erro

                    //451 - Token necessário para o login
                    //404 - Utilizado quando o dado não é encontrado
                    // if (response.status == 412) {
                    //       //412 - Recaptcha inválido
                    //     window.location.reload();
                    // } else
                    //

                    removeWindow();
                    
                    if (response.status >= 400
                        && response.status != 412
                        && response.status != 451
                        && response.status != 404) {
                        //Retorna um json do erro para que o próximo "then"
                        //possa rejeitar a promise.
                        return response.json();
                    } else {
                        //Retornos abaixo de 400 são considerados "ok"
                        resolve(response);
                    }

                }).then((object: any) => {
                    reject(object);
                });


        });
    }
    return {
        del,
        post,
        get,
        put,
        patch,
        upload,
        showError
    }
}

export default useRequest;
