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

   //Lista 3 -  Exercício  1
   it.only('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
   })

    //Lista 3 -  Exercício extra 1
    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    } 
    )
    //Lista 3 -  Exercício extra 2
    it('Seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })    

   

})
