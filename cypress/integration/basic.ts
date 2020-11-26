import {MenuPage} from "../page-objects/MenuPage";
import { ProductPage } from "../page-objects/ProductPage";
function getRandomItemId(): string{
    return Math.round(Math.random() * 60)+'';
}

describe('full test', () => {
    let menu = new MenuPage();
    let productPage = new ProductPage();
    let n : number;
    const ITEM_ID: string = getRandomItemId();
    let ITEM_TITLE: string;
    let ITEM_COMMENTS: number;
    before('navigate to the item', () => {
        menu.navigate();
        cy.server();
        menu.randomProductReviewsItem=ITEM_ID;
        menu.navigateToComputersList();
        cy.get(menu.randomProductReviewsItem).then(title=> {
            ITEM_TITLE = title.text();
        });
    })

    it('check name of the product', () => {
        cy.route('**/v4/comments/get-goods-total?front-type=xl&goodsIds=*&lang=ru').as('nComments');
        cy.get(`:nth-child(${ITEM_ID}) > app-goods-tile-default > .goods-tile > .goods-tile__inner > .goods-tile__rating > :nth-child(1) > .goods-tile__stars > .goods-tile__reviews-link`).scrollIntoView().click();
        cy.get('.product__title').invoke("text").should("contain", ITEM_TITLE);
        cy.wait('@nComments');

        cy.get('body').then(body => {
            if(body.find(':nth-child(3) > .tabs__link > .tabs__link-text')){
                ITEM_COMMENTS = +body.find(':nth-child(3) > .tabs__link > .tabs__link-text').text();
                if(ITEM_COMMENTS%10==0) n = (ITEM_COMMENTS-10) * 0.1
                else n =  Math.floor(ITEM_COMMENTS*0.1);
                 while(n >= 1){
                    n--;
                    cy.get('product-comments button.product-comments__show-more').click();
                    cy.wait(10000);
                }
                }
            });
        cy.get(productPage.numberofAllComments).should(($ul) => {
            expect($ul, 'number items').to.have.length(ITEM_COMMENTS);});
    });
  })
  