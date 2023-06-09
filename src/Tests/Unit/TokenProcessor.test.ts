import TokenProcessor from "../../Engine/TokenProcessor";

describe("TokenProcessor", () => {
  describe("getFormulaString", () => {
    describe("when the formula is empty", () => {
      it("should return an empty string", () => {
        const tokenProcessor = new TokenProcessor();
        const formulaString = tokenProcessor.getFormulaString();
        expect(formulaString).toEqual("");
      });
    }
    );
    describe("when the formula is not empty", () => {
      describe("when the formula has one token", () => {
        it("should return the formula as a string", () => {
          const tokenProcessor = new TokenProcessor();
          tokenProcessor.setFormula(["1"]);
          const formulaString = tokenProcessor.getFormulaString();
          expect(formulaString).toEqual("1");
        });
      }
      );
      describe("when the formula has more than one token", () => {
        it("should return the formula as a string", () => {
          const tokenProcessor = new TokenProcessor();
          tokenProcessor.setFormula(["1", "+", "2"]);
          const formulaString = tokenProcessor.getFormulaString();
          expect(formulaString).toEqual("1 + 2");
        });
      }
      );
    }
    );
  }
  );

  describe("getFormula", () => {
    it("should return the formula", () => {
      const tokenProcessor = new TokenProcessor();
      const formula = tokenProcessor.getFormula();
      expect(formula).toEqual([]);
    });
  }
  );
  describe("setFormula", () => {
    describe("when the formula is empty", () => {
      it("should set the formula", () => {
        const tokenProcessor = new TokenProcessor();
        const formula = ["1", "+", "2"];
        tokenProcessor.setFormula(formula);
        expect(tokenProcessor.getFormula()).toEqual(formula);
      });
    }

    );
    describe("when the formula is not empty", () => {
      it("should set the formula", () => {
        const tokenProcessor = new TokenProcessor();
        const formula = ["1", "+", "2"];
        tokenProcessor.setFormula(formula);
        const formulaNext = ["1", "-", "2"];
        tokenProcessor.setFormula(formulaNext);
        expect(tokenProcessor.getFormula()).toEqual(formulaNext);
      });
    });
  });


  describe("addToken", () => {
    describe("when the formula is empty", () => {
      it("should add the token to the formula", () => {
        const tokenProcessor = new TokenProcessor();
        tokenProcessor.addToken("1");
        expect(tokenProcessor.getFormula()).toEqual(["1"]);
      });
    }
    );
    describe("when the formula is not empty", () => {
      describe("when the last token is a number and the input token is a number", () => {
        it("should append the input token to the last token", () => {
          const tokenProcessor = new TokenProcessor();
          tokenProcessor.setFormula(["1"]);
          tokenProcessor.addToken("2");
          expect(tokenProcessor.getFormula()).toEqual(["12"]);
        });
      }
      );
      describe("when the last token is a number and the input token is .", () => {
        it("should append the input token to the last token", () => {
          const tokenProcessor = new TokenProcessor();
          tokenProcessor.setFormula(["1"]);
          tokenProcessor.addToken(".");
          expect(tokenProcessor.getFormula()).toEqual(["1."]);
        });
      }
      );
      describe("when the last token is not a number and the input token is a number", () => {
        it("should add the token to the formula", () => {
          const tokenProcessor = new TokenProcessor();
          tokenProcessor.setFormula(["1", "+"]);
          tokenProcessor.addToken("2");
          expect(tokenProcessor.getFormula()).toEqual(["1", "+", "2"]);
        });
      }
      );
      describe("when the last token is not a number and the input token is .", () => {
        it("should not add the token to the formula", () => {
          const tokenProcessor = new TokenProcessor();
          tokenProcessor.setFormula(["1", "+"]);
          tokenProcessor.addToken(".");
          expect(tokenProcessor.getFormula()).toEqual(["1", "+"]);
        });
      }
      );
      describe("when the last token is a number than contains a period and the input token  a number", () => {
        it("should add the token to number in the formula", () => {
          const tokenProcessor = new TokenProcessor();
          tokenProcessor.setFormula(["1."]);
          tokenProcessor.addToken("2");
          expect(tokenProcessor.getFormula()).toEqual(["1.2"]);
        });
      }
      );
      describe("when the last token is a number than contains a period and the input token is .", () => {
        it("should not add the token to the formula", () => {
          const tokenProcessor = new TokenProcessor();
          tokenProcessor.setFormula(["1.5"]);
          tokenProcessor.addToken(".");
          expect(tokenProcessor.getFormula()).toEqual(["1.5"]);
        });
      }
      );
    });
  });
  describe("getCellReferences", () => {
    describe("when the formula is empty", () => {
      it("should return an empty array", () => {
        let formula = [];
        let cellsInFormula = TokenProcessor.getCellReferences(formula);
        expect(cellsInFormula).toEqual([]);
      });
    });
    describe("when the formula is not empty, but has no cell references", () => {
      it("should return an empty array", () => {
        let formula = ["1", "+", "2"];
        let cellsInFormula = TokenProcessor.getCellReferences(formula);
        expect(cellsInFormula).toEqual([]);
      });
    });
    describe("when the formula is not empty, and has cell references", () => {  
      it("should return an array of cell references", () => {
        let formula = ["A1", "+", "B2"];
        let cellsInFormula = TokenProcessor.getCellReferences(formula);
        expect(cellsInFormula).toEqual(["A1", "B2"]); 
      });
    });
    describe("when the formula is A1 + A2 + A1", () => {
      it("should return an array of cell references", () => {
        let formula = ["A1", "+", "A2", "+", "A1"];
        let cellsInFormula = TokenProcessor.getCellReferences(formula);
        expect(cellsInFormula).toEqual(["A1", "A2"]);
      });
    });
  });
});

