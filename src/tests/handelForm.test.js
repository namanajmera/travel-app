import { handleFormSubmit } from "../client/js/handleForm"

describe("handleForm file testing", () => {
    test("Testing the handleFormSubmit() function is defined or not", () => {
        expect(handleFormSubmit).toBeDefined();
    })
});
