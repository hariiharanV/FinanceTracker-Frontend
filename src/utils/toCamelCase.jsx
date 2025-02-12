function toCamelCase(value) {
    return value
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase());
  }

export default toCamelCase
