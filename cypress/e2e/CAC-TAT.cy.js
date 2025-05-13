describe('Central de Atendimento ao Cliente TAT', () => {  

  const validEmail = 'email@valido.com';
  const invalidEmail = 'email-invalido.com'


  const inputForm = (email) => {
    const longText = Cypress._.repeat('Lorem Ipsum ', 10)

    cy.get('#firstName').type('First')
    cy.get('#lastName').type('Last')
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(longText, { delay: 0 })

  }

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    inputForm(validEmail)
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')

  })

  // Exercício extra 2
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    inputForm(invalidEmail)
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })

  // Exercício extra 3
  it('Verifica se campo de telefone aceita apenas números', () => {
    cy.get('#phone')
      .type('a1b2c3d4')
      .should('have.value', '1234')
  })

   // Exercício extra 4
   it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    inputForm(validEmail)
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

   })

})
