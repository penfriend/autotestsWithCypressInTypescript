function getRandomComputer(): string{
    return Math.round(Math.random() * 60)+'';
}

describe('full test', () => {
    let n : number;
    const ITEM_ID: string = getRandomComputer();
    let ITEM_TITLE: string;
    let ITEM_COMMENTS: number;
    before('navigate to the item', () => {
        cy.visit('https://rozetka.com.ua/');
        cy.get('.side-menu__toggler > svg').click();
        cy.get('.menu-main > :nth-child(1) > .button').click();
        cy.get(':nth-child(1) > .fat-main__link > .fat-main__title').click();
        cy.server();
        cy.route('**/v2/goods/get-price/?ids=*&with_show_in_site=1&lng=ru&lang=ru').as('getProductList');
        cy.get('.fat-popular > :nth-child(1) > .fat-link').click();
        cy.get(`:nth-child(${ITEM_ID}) > app-goods-tile-default > .goods-tile > .goods-tile__inner > .goods-tile__heading > .goods-tile__title`, { timeout: 10000 }).as('product').scrollIntoView()
        cy.get('@product').then(title=> {
            ITEM_TITLE = title.text();
            cy.log('firstITEM_TITLE='+ITEM_TITLE);
        });
    })

    it('check name of the product', () => {
        cy.route('**/v4/comments/get-goods-total?front-type=xl&goodsIds=*&lang=ru').as('nComments');
        cy.wait('@getProductList');
        cy.get(`:nth-child(${ITEM_ID}) > app-goods-tile-default > .goods-tile > .goods-tile__inner > .goods-tile__rating > :nth-child(1) > .goods-tile__stars > .goods-tile__reviews-link`).scrollIntoView().click();
        cy.get('.product__title').invoke("text").should("contain", ITEM_TITLE);
        cy.wait('@nComments');

        cy.get('body').then(body => {
            if(body.find(':nth-child(3) > .tabs__link > .tabs__link-text')){
                ITEM_COMMENTS = +body.find(':nth-child(3) > .tabs__link > .tabs__link-text').text();
                if(ITEM_COMMENTS%10==0) n = (ITEM_COMMENTS-10) * 0.1
                else n =  Math.floor(ITEM_COMMENTS*0.1);
                cy.log('n='+n);
                 cy.log('firstITEM_COMMENTS='+ITEM_COMMENTS);
                 while(n >= 1){
                    n--;
                    cy.log('n='+n);
                    cy.get('product-comments button.product-comments__show-more').click();
                    cy.wait(10000);
                }
                }
            });
        cy.get('ul.product-comments__list > li').should(($ul) => {
            expect($ul, 'number items').to.have.length(ITEM_COMMENTS);});
    });
  })
  