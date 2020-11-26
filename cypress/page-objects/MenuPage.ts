export class MenuPage {
    private _baseurl: string = 'https://rozetka.com.ua/';
    private _openMenuButton: string = '.side-menu__toggler > svg';
    private _catalogOfProducts: string = '.menu-main > :nth-child(1) > .button';
    private _notebooksAndComputers: string = ':nth-child(1) > .fat-main__link > .fat-main__title';
    private _notebooks: string = '.fat-popular > :nth-child(1) > .fat-link';
    private _xhrGetProductList = '**/v2/goods/get-price/?ids=*&with_show_in_site=1&lng=ru&lang=ru';
    private _randomProductReviewsItem = ':nth-child(1) .goods-tile__heading > .goods-tile__title';
    get randomProductReviewsItem(): string {
        return this._randomProductReviewsItem;
    }
    set randomProductReviewsItem(itemId){
        this._randomProductReviewsItem = `:nth-child(${itemId}) .goods-tile__heading > .goods-tile__title`;
    }
    get xhrGetProductList(): string {
        return this._xhrGetProductList;
    }

    get openMenuButton(): string {
        return this._openMenuButton;
    }

    get catalogOfProducts(): string {
        return this._catalogOfProducts;
    }

    get notebooksAndComputers(): string {
        return this._notebooksAndComputers;
    }

    get notebooks(): string {
        return this._notebooks;
    }

    navigate():void {
        cy.visit(this._baseurl);
    }

    navigateToComputersList():void{
        cy.get(this.openMenuButton).click();
        cy.get(this.catalogOfProducts).click();
        cy.get(this.notebooksAndComputers).click();
        cy.route(this.xhrGetProductList).as('productList');
        cy.get(this.notebooks).click();
        cy.wait('@productList');
        cy.get(this.randomProductReviewsItem).scrollIntoView();
    }


}