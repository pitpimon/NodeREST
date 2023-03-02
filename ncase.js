const str = "this is an example string"; // input string

// Convert to snake case
const snakeCase = str.replace(/\s+/g, "_").toLowerCase();

// Convert to kebab case
const kebabCase = str.replace(/\s+/g, "-").toLowerCase();

// Convert to camel case
const camelCase = str.replace(/\s+(\w)/g, (_, c) => c.toUpperCase());

console.log(snakeCase); // this_is_an_example_string
console.log(kebabCase); // this-is-an-example-string
console.log(camelCase); // thisIsAnExampleString
