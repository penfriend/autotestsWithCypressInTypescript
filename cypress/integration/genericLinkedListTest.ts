import {LinkedList} from "./genericLinkedList";

describe('all tests',()=>{
    let listNum = new LinkedList<number>();

    it('adding',()=>{
        listNum.push(3);
        listNum.push(2);
        listNum.push(1);
        cy.log(listNum.toArray().toString());
        cy.log(listNum.len.toString());

        listNum.pop();
        cy.log(listNum.toArray().toString());
        cy.log(listNum.len.toString());
        listNum.pop();
        cy.log(listNum.toArray().toString());
        cy.log(listNum.len.toString());
        listNum.pop();
        cy.log(listNum.toArray().toString());
        cy.log(listNum.len.toString());

    })
})