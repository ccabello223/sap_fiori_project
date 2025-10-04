import Controller from "sap/ui/core/mvc/Controller";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import ListBinding from "sap/ui/model/ListBinding"
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace cacsfiori.invoices.controller
 * @namespace cacsfiori.invoices.Filter
 * @namespace cacsfiori.invoices.FilterOperator
 */
export default class MainView extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const oDataJSON = new JSONModel();
        const oView = this.getView();
        oDataJSON.loadData("./model/SelectionScreenMenu.json");
        oView?.setModel(oDataJSON, "selectionScreen");
        // console.log(oDataJSON.getProperty("/Countries"));
    }

    public onFilter(oEvent: any): void {
        const ShipName = this.getView()?.getModel("selectionScreen")?.getProperty("/ShipName");
        const CountryKey = this.getView()?.getModel("selectionScreen")?.getProperty("/CountryKey");
        let filters = [];

        if (ShipName !== "") {
            filters.push(new Filter("ShipName", FilterOperator.Contains, ShipName))
        }

        if (CountryKey !== "") {
            filters.push(new Filter("Country", FilterOperator.EQ, CountryKey))
        }

        const oList = this.getView()?.byId("invoicesList");
        const oBinding = oList?.getBinding("items") as ListBinding;
        oBinding?.filter(filters)
    }

    public onClearFilter(): void {
        const oModelSelScreen = this.getView()?.getModel("selectionScreen") as JSONModel;
        oModelSelScreen?.setProperty("/ShipName", "");
        oModelSelScreen?.setProperty("/CountryKey", "");

        const oList = this.getView()?.byId("invoicesList");
        const oBinding = oList?.getBinding("items") as ListBinding;
        oBinding?.filter([]);
    }

    public onListItemPress(oEvent: any): void {
        console.log("Item presionado", oEvent);

        var oItem = oEvent.getParameter("listItem");
        const oCtx = oItem.getBindingContext();

        if (!oCtx) {
            console.warn("No se encontró contexto de binding");
            return;
        }

        const sPath = encodeURIComponent(oCtx.getPath());
        console.log("Path seleccionado:", sPath);

        const oRouter = UIComponent.getRouterFor(this);
        oRouter.navTo("detail", { invoicePath: sPath });
    }

}