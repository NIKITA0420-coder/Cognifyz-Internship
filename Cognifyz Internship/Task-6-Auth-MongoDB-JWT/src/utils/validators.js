// Server-side rules mirror public/js/validation.js (client checks can be bypassed)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function passwordErrors(pw = "") {
  const errs = [];
  if (pw.length < 8) errs.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(pw)) errs.push("Password needs an uppercase letter");
  if (!/[a-z]/.test(pw)) errs.push("Password needs a lowercase letter");
  if (!/\d/.test(pw)) errs.push("Password needs a number");
  if (!/[^A-Za-z0-9]/.test(pw)) errs.push("Password needs a symbol");
  return errs;
}

function validateRegister({ name, email, password, confirmPassword }) {
  const errs = [];
  if (!name || name.trim().length < 2) errs.push("Name must be at least 2 characters");
  if (!email || !EMAIL_RE.test(email)) errs.push("A valid email is required");
  errs.push(...passwordErrors(password));
  if (confirmPassword !== undefined && password !== confirmPassword)
    errs.push("Passwords do not match");
  return errs;
}

module.exports = { validateRegister, passwordErrors, EMAIL_RE };
