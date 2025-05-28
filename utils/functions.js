const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) =>{
  password.length >= 8 &&
  /[A-Z]/.test(password) && 
  /[a-z]/.test(password) && 
  /\d/.test(password) && 
  /[\W_]/.test(password);
}

const allowedRoles = ['user', 'admin'];

const isPositiveInteger = (val) => Number.isInteger(val) && val > 0;

const isNonEmptyString = (str) => typeof str === 'string' && str.trim() !== '';

const isValidDate = (date) => !isNaN(new Date(date).getTime());


module.exports = {isStrongPassword, isValidEmail, allowedRoles, isPositiveInteger,isNonEmptyString,isValidDate}