import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace cacsfiori.invoices.controller
 */
export default class DetailView extends Controller {

    public onInit(): void {
        const oRouter = UIComponent.getRouterFor(this);
        oRouter.getRoute("detail")!.attachPatternMatched(this._onObjectMatched, this);
    }

    private _onObjectMatched(oEvent: any): void {
        const sPath = decodeURIComponent(oEvent.getParameter("arguments").invoicePath);
        this.getView()?.bindElement(sPath);
    }

    public onNavBack(): void {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            const oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("main", {}, true);
        }
    }
}