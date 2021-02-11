describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      username: "bleu",
      name: "Elysee Bleu",
      password: "bleu",
    };

    cy.request("POST", "http://localhost:3001/api/users", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#username").should("be.visible");
    cy.get("#password").should("be.visible");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("bleu");
      cy.get("#password").type("bleu");
      cy.contains("login").click();

      cy.contains("Elysee Bleu logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("Alan");
      cy.get("#password").type("Walker");
      cy.contains("login").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Alan Walker logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      const user = {
        username: "bleu",
        password: "bleu",
      };
      cy.login(user);

      cy.createBlog({
        title: "Aubergiste",
        author: "Jen huan",
        url: "amazon.fr",
        likes: 10
      });

      cy.createBlog({
        title: "Coffee",
        author: "Jen huan",
        url: "amazon.fr",
        likes: 9
      });
    });

    it("a blog can be created", function () {
      cy.contains("new blog").click();
      cy.get(".title").type("A good year");
      cy.get(".author").type("Max miller");
      cy.get(".url").type("http://max-miller.com");
      cy.contains("create").click();

      cy.contains("A good year Max miller");
    });

    it("a user can like a blog", function () {
      cy.contains("Aubergiste Jen huan").contains("view").click();
      cy.get(".likeButton").contains("like").click();
      cy.get(".likeButton").parent().should("contain", "likes 11");
    });

    it("user who created a blog can delete it", function () {
      cy.contains("Aubergiste Jen huan").contains("view").click();
      cy.contains("delete").click();
      cy.get("html")
        .get(".success")
        .contains("Aubergiste by Jen huan deleted successfully");
    });

    describe("when a user create some blog", function () {
      beforeEach(function () {
        const anotherUser = {
          username: "jamie001",
          name: "Jamie lannister",
          password: "jamie00001",
        };
        cy.request("POST", "http://localhost:3001/api/users", anotherUser);

        cy.login({ username: "jamie001", password: "jamie00001" });
        cy.createBlog({
          title: "Game of throne",
          author: "Robert Martin",
          url: "got.com",
          likes: 20
        });
      });

      it("another user cant delete someone else blog", function () {
        cy.contains("Aubergiste Jen huan").contains("view").click();
        cy.contains("Aubergiste Jen huan").parent().contains('delete').click();
        cy.get(".error")
          .should("contain", "You are not authorized to delete this blog")
          .and("have.css", "color", "rgb(255, 0, 0)")
          .and("have.css", "border-style", "solid");
      });

      it("checks that the blogs are ordered according to likes", function () {});
    });
  });
});
