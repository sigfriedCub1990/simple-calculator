/* eslint-disable jest/expect-expect */
describe('Calculator tests', () => {
  describe('simple operations', () => {
    it('should compute the sum of 20 and 22', () => {
      cy.visit('http://localhost:1234');
      cy.get('.calculator__pad').within(() => {
        cy.contains('2').click();
        cy.contains('0').click();
        cy.contains('+').click();
        cy.contains('2').click();
        cy.contains('2').click();
      });

      cy.get('[data-cy=calc]').click();
      cy.get('#display').should('have.value', '42');
    });

    it('should compute the subtraction of 40 and 22', () => {
      cy.visit('http://localhost:1234');
      cy.get('.calculator__pad').within(() => {
        cy.contains('4').click();
        cy.contains('0').click();
        cy.contains('-').click();
        cy.contains('2').click();
        cy.contains('2').click();
      });

      cy.get('[data-cy=calc]').click();
      cy.get('#display').should('have.value', '18');
    });

    it('should compute the multiplication of 40 and 20', () => {
      cy.visit('http://localhost:1234');
      cy.get('.calculator__pad').within(() => {
        cy.contains('4').click();
        cy.contains('0').click();
        cy.contains('x').click();
        cy.contains('2').click();
        cy.contains('0').click();
      });

      cy.get('[data-cy=calc]').click();
      cy.get('#display').should('have.value', '800');
    });

    it('should compute the division of 40 and 20', () => {
      cy.visit('http://localhost:1234');
      cy.get('.calculator__pad').within(() => {
        cy.contains('4').click();
        cy.contains('0').click();
        cy.contains('/').click();
        cy.contains('2').click();
        cy.contains('0').click();
      });

      cy.get('[data-cy=calc]').click();
      cy.get('#display').should('have.value', '2');
    });
  });

  describe('calculator buttons', () => {
    it('should erase computed result', () => {
      cy.visit('http://localhost:1234');
      cy.get('.calculator__pad').within(() => {
        cy.contains('2').click();
        cy.contains('0').click();
        cy.contains('+').click();
        cy.contains('2').click();
        cy.contains('2').click();
      });

      cy.get('[data-cy=calc]').click();
      cy.get('#display').should('have.value', '42');
      cy.get('[data-cy=reset]').click();
      cy.get('#display').should('have.value', '');
    });

    it('should delete last entered digit', () => {
      cy.visit('http://localhost:1234');
      cy.get('.calculator__pad').within(() => {
        cy.contains('2').click();
        cy.contains('0').click();
        cy.contains('+').click();
        cy.contains('2').click();
        cy.contains('2').click();
      });

      cy.get('[data-cy=delete]').click();
      cy.get('#display').should('have.value', '20+2');
    });
  });

  describe('compound operations', () => {
    it('should compute 8*4+10', () => {
      cy.visit('http://localhost:1234');
      cy.get('.calculator__pad').within(() => {
        cy.contains('8').click();
        cy.contains('x').click();
        cy.contains('4').click();
        cy.contains('+').click();
        cy.contains('1').click();
        cy.contains('0').click();
      });

      cy.get('[data-cy=calc]').click();
      cy.get('#display').should('have.value', '42');
    });

    it('should compute 8*5/10', () => {
      cy.visit('http://localhost:1234');
      cy.get('.calculator__pad').within(() => {
        cy.contains('8').click();
        cy.contains('x').click();
        cy.contains('5').click();
        cy.contains('/').click();
        cy.contains('1').click();
        cy.contains('0').click();
      });

      cy.get('[data-cy=calc]').click();
      cy.get('#display').should('have.value', '4');
    });
  });

  describe('changing theme', () => {
    it('should switch between themes', () => {
      cy.contains(2).click();
      cy.get('body').as('body').should('have.class', 'theme-light');
      cy.contains(3).click();
      cy.get('@body').should('have.class', 'theme-dark');
      cy.contains(1).click();
      cy.get('@body').should('have.class', 'theme-default');
    });

    it('should persist theme if user reloads page', () => {
      cy.contains(2).click();
      cy.get('body').as('body').should('have.class', 'theme-light');
      cy.reload();
      cy.get('@body').should('have.class', 'theme-light');
    });
  });
});
