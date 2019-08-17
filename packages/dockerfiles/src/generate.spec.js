"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = require("./generate");
describe("generate", () => {
    it('it should generate the testData', async () => {
        const data = await generate_1.run('src/testData');
        data.map((d) => {
            const [first, ...rest] = d.imagenameStack;
            return { ...d, imagenameStack: rest };
        });
        expect(data).toMatchSnapshot();
    });
});
