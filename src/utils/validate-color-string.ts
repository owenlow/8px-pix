export default function validateColorString(input: string) {
    if (input[0] !== "#") {
        throw new Error("Color string does not start with '#'");
    }
}
