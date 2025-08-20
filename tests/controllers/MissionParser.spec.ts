import { it, expect, describe } from "vitest"
import MissionParser from "../../src/controllers/MissionParser";

const correctText = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
`;
const invalidPlainText = "@";
const invalidWidthText = "? 1";
const invalidHeightText = "1 ?";
const maxSizeText = "100 100";
const invalidRoverX = `5 5
? 1 N`;
const invalidRoverY = `5 5
1 ? N`;
const invalidRoverDirection = `5 5
1 1 H`;
const multipleRoversSamePosition = `5 5
0 0 N 
L
0 0 N
L`;

describe("parse test", () => {
    it("will not throw any error", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        //Assert
        expect(() => parser.parse(correctText)).not.toThrowError();
    });

    it("will throw plain error", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        //Assert
        expect(() => parser.parse(invalidPlainText)).toThrowError("Parâmetro para planalto inválido.");
    });
    it("will throw plain width error", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        //Assert
        expect(() => parser.parse(invalidWidthText)).toThrowError(/^Parâmetro para largura inválido/g);
    });
    it("will throw plain height error", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        //Assert
        expect(() => parser.parse(invalidHeightText)).toThrowError(/^Parâmetro para altura inválido/g);
    });
    it("will throw plain max size error", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        //Assert
        expect(() => parser.parse(maxSizeText)).toThrowError("Valor para planalto excedeu o limite máximo permitido.");
    });
    it("will throw rover invalid x error", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        //Assert
        expect(() => parser.parse(invalidRoverX)).toThrowError(/^Parâmetro para X inválido/g);
    });
    it("will throw rover invalid y error", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        //Assert
        expect(() => parser.parse(invalidRoverY)).toThrowError(/^Parâmetro para Y inválido/g);
    });
    it("will throw rover invalid direction error", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        //Assert
        expect(() => parser.parse(invalidRoverDirection)).toThrowError(/^Parâmetro para a direção inválido/g);
    });
    it("will throw multiple rovers error", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        //Assert
        expect(() => parser.parse(multipleRoversSamePosition)).toThrowError(/^Há mais de um rover na posição/g);
    });
    it("will have 5 columns", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        parser.parse(correctText);

        //Assert
        expect(parser.width).toBe(5);
    });
    it("will have 5 rows", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        parser.parse(correctText);

        //Assert
        expect(parser.height).toBe(5);
    });
    it("will have 2 rovers", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        parser.parse(correctText);

        //Assert
        expect(parser.rovers.length).toBe(2);
    });
    it("first rover will be in N", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        parser.parse(correctText);

        //Assert
        expect(parser.rovers[0].direction).toBe("N");
    });
    it("first rover will have 9 commands", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        parser.parse(correctText);

        //Assert
        expect(parser.rovers[0].commands.length).toBe(9);
    });
    it("second rover will be in E", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        parser.parse(correctText);

        //Assert
        expect(parser.rovers[1].direction).toBe("E");
    });
    it("second rover will have 10 commands", () => {
        //Arrange
        let parser = new MissionParser();

        //Act
        parser.parse(correctText);

        //Assert
        expect(parser.rovers[1].commands.length).toBe(10);
    });
});