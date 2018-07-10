import faker from 'faker';

const validar = (inputs) => {
    let fillFields = Object.keys(inputs).every(key => {
        return inputs[key].value !== "";
    })

    if (!fillFields || inputs.acept.checked === false) {
        return "Debes rellenar todos los campos";
    }

    if (inputs.passOne.value !== inputs.passTwo.value) {
        return "Las contraseñas deben ser iguales";
    }

    return true;
}

let inputs = 
    {
        nameUser: faker.internet.userName(),
        email: faker.internet.email(),
        passOne: '(1a)',
        passTwo: '(1a)',
        acept: {
            checked: true
        }
    }


describe("Check Register", () => {
    test("Testing function validate", () => {
        const mockValidar = jest.fn(validar);
        let result =  mockValidar(inputs);

        expect(mockValidar).toHaveBeenCalled();
        
    })
})