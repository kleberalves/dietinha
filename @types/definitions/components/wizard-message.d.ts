interface IWizardMessage extends HTMLElement {

    onOk: (env: (e: CustomEventInit) => void) => void;

}