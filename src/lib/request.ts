import { API_BASE_URL_SERVER, API_MODULE_DIET, getenv, stores } from "../service/config.service";
import { store } from "../service/store.service";
import { removeWindow, showLoading } from "./message.lib";

export const useRequest = (module?: string, error?: any, logout?: () => void) => {

    /**
     * Realiza uma requisição Post
     * @param url URL relativa
     * @param body JSON body
     * @param silent Se true, não exibe o "loading"
     * @returns 
     */
    const post = async (url: string, body: any, silent?: boolean): Promise<any> => {
        return await request(url, "POST", JSON.stringify(body), module, silent);
    }
    /**
     * 
     * @param url 
     * @returns 
     */
    const get = async (url: string): Promise<Response | undefined> => {

        try {
            return await request(url, "GET", null, module);
        } catch (message) {
            showError(message);
        }
    }

    const del = async (url: string): Promise<Response | undefined> => {

        try {
            return await request(url, "DELETE", null, module);
        } catch (message) {
            showError(message);
        }
    }

    const upload = async (url: string, file: any): Promise<Response | undefined> => {
        try {
            let formData = new FormData();
            await formData.append('image', file);
            return await request(url, "POST", formData, module, false, "");

        } catch (error) {
            showError(error);
        }

    }

    const put = async (url: string, body: any): Promise<Response | undefined> => {
        try {
            return await request(url, "PUT", JSON.stringify(body), module);

        } catch (error) {
            showError(error);
        }
    }

    const patch = async (url: string, body: any): Promise<Response | undefined> => {
        try {
            return await request(url, "PATCH", JSON.stringify(body), module);

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
        module?: string,
        silent?: boolean,
        contentType: string = 'application/json'): Promise<any> => {

        return new Promise<any>(async (resolve, reject) => {

            let items: any[] = store.getItems(stores.Login);
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

            if (!silent) {
                showLoading();
            }

            let base: string | undefined;
            if (module) {
                base = getenv(API_MODULE_DIET);
            } else {
                base = getenv(API_BASE_URL_SERVER);
            }
            //Preferência para API_BASE_URL_SERVER caso esteja sendo executado no servidor
            //internamente redirecionará para BASE_URL se estiver no cliente
            fetch(`${base}${url}`, config)
                .then(async (response) => {
                    if (!silent) {
                        removeWindow();
                    }

                    if (response.status >= 400) {
                        let responseBody = await response.json();
                        console.log(responseBody);
                        reject(responseBody);
                    } else {

                        let responseBody = await response.json();
                        console.log(responseBody);
                        resolve(responseBody);
                    }

                }).catch((e) => {

                    if (e.toString().toLowerCase().indexOf("failed to fetch")) {
                        reject("Não foi possível alcançar os nossos servidores. Verifique a internet e tente novamente.");
                    } else {
                        reject(e.toString());
                    }
                    if (!silent) {
                        removeWindow();
                    }
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
