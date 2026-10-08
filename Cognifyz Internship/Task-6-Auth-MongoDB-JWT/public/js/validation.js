// Client-side validation helpers (server re-checks everything)
const Validation = (() => {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const passwordChecks = (pw) => ({
    len: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    num: /\d/.test(pw),
    sym: /[^A-Za-z0-9]/.test(pw),
  });

  const strength = (pw) => {
    const score = Object.values(passwordChecks(pw)).filter(Boolean).length;
    const labels = ["—", "Very weak", "Weak", "Fair", "Good", "Strong"];
    return { score, label: pw ? labels[score] : "—" };
  };

  return {
    passwordChecks,
    strength,
    name: (v) => (v.trim().length >= 2 ? "" : "Enter at least 2 characters"),
    email: (v) => (EMAIL_RE.test(v) ? "" : "Enter a valid email address"),
    password: (v) => (Object.values(passwordChecks(v)).every(Boolean) ? "" : "Password does not meet all rules"),
    confirm: (v, pw) => (v && v === pw ? "" : "Passwords do not match"),
  };
})();
