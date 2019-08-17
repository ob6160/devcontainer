import {run} from "./generate";

describe("generate",()=> {
    it ('it should generate the testData', async () => {
        const data = await run('src/testData');
        
        data.map((d:any) => {
            const [first, ...rest] = d.imagenameStack;
            return {...d, imagenameStack: rest}
        });

        expect(data).toMatchSnapshot();
    })

})