import { validationData } from "./data/validationData.js";

/**
 *
 * @param {*} validationData Validation Data from backend
 * @returns newObject which contains turned on state in the validation data
 */
const getStateObject = (validationData) => {
  const newObject = {};
  for (let key in validationData) {
    if (validationData[key].show === "on") newObject[key] = "";
  }
  return newObject;
};

// Type of input given
const inputType = {
  EMAIL: "email",
  URL: "url",
  TEXT: "text",
};

// Error Message
const errorMessages = {
  InvalidEmail: "Email is not Invalid!",
  InvalidURL: "Given URL is Invalid!",
};

// Regex for test
const validationRegex = {
  mail_format: /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/,
  url_format:
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
};

/**
 *
 * @param {*} validationCriteria Type Of validation
 * @param {*} value              Input Value
 * @returns                      errors in field || nothing
 */
const validate = (validationCriteria, value) => {
  const errors = [];
  switch (validationCriteria.type) {
    case inputType.EMAIL: {
      if (!value.match(validationRegex.mail_format))
        errors.push(errorMessages.InvalidEmail);
      return errors;
    }
    case inputType.URL: {
      if (!value.match(validationRegex.url_format))
        errors.push(errorMessages.InvalidURL);
      return errors;
    }
    default:
      return errors;
  }
};

/**
 * { email: '', first_name: '', tell_us_about_yourself: '' }
 */
const user = getStateObject(validationData);

/**
 *
 * @param {*} validationData Main Validation Data
 * @param {*} user User Input Data
 * @returns error || {}
 */
const validateWithError = (validationData, user) => {
  const error = {};

  for (const key in user) {
    const validationCriteria = validationData[key];
    const errorInValue = validate(validationCriteria, user[key]);
    if (errorInValue.length > 0) error[key] = errorInValue;
  }

  console.log({ error });

  return error;
};

const errorsInUser = validateWithError(validationData, user);

if (Object.keys(errorsInUser).length === 0) {
  // Run you after validate code
} else {
  // Set errors in state
}
