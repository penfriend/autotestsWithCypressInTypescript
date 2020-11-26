export class ProductPage {
    private _numberofAllComments: string = 'ul.product-comments__list > li';

    get numberofAllComments(): string {
        return this._numberofAllComments;
    }
}