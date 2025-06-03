describe("Central de Atendimento ao Cliente TAT", () => {
  const validEmail = "email@valido.com";
  const invalidEmail = "email-invalido.com";
  const longText = Cypress._.repeat("Lorem Ipsum ", 10);

  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("Verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("Preenche os campos obrigatórios e envia o formulário", () => {
    cy.fillMandatoryField();
    cy.get('button[type="submit"]').click();
    cy.get(".success").should("be.visible");
  });

  // Exercício extra 2
  it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    const data = {
      email: invalidEmail,
    };
    cy.fillMandatoryField(data);
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  // Exercício extra 3
  it("Verifica se campo de telefone aceita apenas números", () => {
    cy.get("#phone").type("a1b2c3d4").should("have.value", "1234");
  });

  // Exercício extra 4
  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.fillMandatoryField();
    cy.get("#phone-checkbox").click();
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  // Exercício extra 5
  it("Preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("First")
      .should("have.value", "First")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Last")
      .should("have.value", "Last")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("teste@gmail.com")
      .should("have.value", "teste@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#open-text-area")
      .type(longText, { delay: 0 })
      .should("have.value", longText)
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("a1b2c3d4")
      .should("have.value", "1234")
      .clear()
      .should("have.value", "");
  });

  // Exercício extra 6
  it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  // Exercício extra 7
  it("Envia o formuário com sucesso usando um comando customizado", () => {
    const data = {
      firstName: "User",
      lastName: "Teste",
      email: validEmail,
      text: longText,
    };
    cy.fillMandatoryFieldAndSubmit(data);
    cy.get(".success").should("be.visible");
  });

  // Exercício extra 8
  it("Envia o formuário com sucesso buscado seletor por contéudo textual", () => {
    cy.fillMandatoryField();
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  //Lista 3 -  Exercício  1
  it("Seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  //Lista 3 -  Exercício extra 1
  it("Seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  //Lista 3 -  Exercício extra 2
  it("Seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  // Lista 4 - Exercício
  it('Marca o tipo de atendimento "Feedback', () => {
    cy.get("#support-type > :nth-child(4) > input")
      .check()
      .should("be.checked");
  });

  //Lista 4 -  Exercício extra 2
  it("Marca cada tipo de atendimento", () => {
    cy.get("#support-type input").each(($radio, index, $list) => {
      cy.wrap($radio).check().should("be.checked");
      if (index > 0) {
        cy.wrap($list[index - 1]).should("not.be.checked");
      }
    });
  });

  // Lista 5 - Exercício
  it("Marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  // Lista 5 - Exercício extra 1
  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#phone-checkbox").check();
    cy.fillMandatoryFieldAndSubmit();
    cy.get(".error").should("be.visible");
  });

  // Lista 6 - Exercício
  it("Seleciona um arquivo da pasta fixture", () => {
    const fileName = "example.json";
    cy.get("#file-upload")
      .selectFile(`cypress/fixtures/${fileName}`)
      .should((input) => {
        expect(input[0].files[0].name).to.equal(fileName);
      });
  });

  // Lista 6 - Exercício v2
  it("Seleciona um arquivo da pasta fixture", () => {
    cy.uploadFileAndCheck("#file-upload", "cypress/fixtures/example.json");
  });

  // Lista 6 - Exercício extra 1
  it("Seleciona um arquivo simulando um drag-and-drop", () => {
    const fileName = "example.json";
    cy.get("#file-upload")
      .selectFile(`cypress/fixtures/${fileName}`, { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal(fileName);
      });
  });

  // Lista 6 - Exercício extra 1
  it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile")
    cy.get("#file-upload")
    .selectFile("@sampleFile")
    .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  // Lista 7 - Exercício 
  it("Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () =>{
    cy.get('#privacy > a')
    .should('have.attr', 'target', '_blank')
    .and('have.attr', 'href', 'privacy.html')
  })

  // Lista 7 - Exercício extra 1
  it("Acessa a página da política de privacidade removendo o target e então clicando no link", () =>{
    cy.get('#privacy > a')
    .invoke('removeAttr', 'target')
    .click()

    cy.get("#title")
    .should("have.text", "CAC TAT - Política de Privacidade"); 
  } )


});

describe("Página de Política de Privacidade", () => {
  
  beforeEach(() => {
    cy.visit("./src/privacy.html"); 
  });

    // Lista 7 - Exercício extra 2 - Desafio
  it("Testa a página da política de privacidade de forma independente", () => {
    cy.contains("h1", "CAC TAT - Política de Privacidade")
    .should("be.visible"); 

    cy.contains("p" , "Talking About Testing")
    .should("be.visible")
  });


});