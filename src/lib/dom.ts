export const getDivByClassId = (className:string, divId: string) => {

    let tabs = document.getElementsByClassName(className);

    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id === divId) {
            return tabs[i];
        }
    }
}

