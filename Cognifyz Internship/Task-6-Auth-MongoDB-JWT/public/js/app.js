const $ = (id) => document.getElementById(id);
const views = ["register", "login", "welcome"];
let notice = "";

/* ---------- API helper ---------- */
async function api(path, method = "GET", body) {
  const token = sessionStorage.getItem("token");
  const res = await fetch("/api/auth" + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: "Bearer " + token }),
    },
    body: body && JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

/* ---------- Hash router ---------- */
async function router() {
  let route = location.hash.replace("#/", "") || "login";
  if (!views.includes(route)) route = "login";
  const hasToken = !!sessionStorage.getItem("token");

  if (route === "welcome" && !hasToken) return (location.hash = "#/login"); // guard
  if (route !== "welcome" && hasToken) return (location.hash = "#/welcome");

  views.forEach((v) => ($("view-" + v).hidden = v !== route));
  $("loginNotice").textContent = route === "login" ? notice : "";
  if (route === "login") notice = "";
  if (route === "welcome") await loadProfile();
}

async function loadProfile() {
  try {
    const { user } = await api("/me");
    $("wName").textContent = user.name;
    $("wEmail").textContent = user.email;
    $("wRole").textContent = user.role;
    $("wLast").textContent = user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleTimeString() : "—";
    $("wCount").textContent = user.loginCount;
  } catch {
    logout(); // token invalid or expired
  }
}

function logout() {
  sessionStorage.removeItem("token");
  location.hash = "#/login";
  router();
}

/* ---------- Register ---------- */
const fields = {
  rName: () => Validation.name($("rName").value),
  rEmail: () => Validation.email($("rEmail").value),
  rPassword: () => Validation.password($("rPassword").value),
  rConfirm: () => Validation.confirm($("rConfirm").value, $("rPassword").value),
};

function showFieldError(id) {
  const msg = fields[id]();
  const input = $(id);
  const out = document.querySelector(`.err[data-for="${id}"]`);
  if (out) out.textContent = input.value ? msg : "";
  input.classList.toggle("invalid", !!input.value && !!msg);
  input.classList.toggle("valid", !!input.value && !msg);
  return !msg;
}

Object.keys(fields).forEach((id) => $(id).addEventListener("input", () => {
  showFieldError(id);
  if (id === "rPassword") {
    updateStrength();
    if ($("rConfirm").value) showFieldError("rConfirm");
  }
}));

function updateStrength() {
  const pw = $("rPassword").value;
  const checks = Validation.passwordChecks(pw);
  document.querySelectorAll("#rules li").forEach((li) =>
    li.classList.toggle("pass", checks[li.dataset.rule]));
  const { score, label } = Validation.strength(pw);
  $("strengthText").textContent = label;
  $("strengthBar").style.width = score * 20 + "%";
  $("strengthBar").style.background = score >= 4 ? "var(--ok)" : score >= 3 ? "#eab308" : "var(--bad)";
}

$("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  $("registerMsg").textContent = "";
  // show errors even for empty fields on submit
  const allOk = Object.keys(fields).map((id) => {
    const msg = fields[id]();
    const out = document.querySelector(`.err[data-for="${id}"]`);
    if (out) out.textContent = msg;
    $(id).classList.toggle("invalid", !!msg);
    return !msg;
  }).every(Boolean);
  if (!allOk) return;

  const btn = e.submitter; btn.disabled = true;
  try {
    await api("/register", "POST", {
      name: $("rName").value,
      email: $("rEmail").value,
      password: $("rPassword").value,
      confirmPassword: $("rConfirm").value,
    });
    e.target.reset();
    updateStrength();
    document.querySelectorAll("#registerForm input").forEach((i) => i.classList.remove("valid", "invalid"));
    notice = "Account created! Please sign in.";
    location.hash = "#/login";
    router();
  } catch (err) {
    $("registerMsg").textContent = err.message;
  } finally { btn.disabled = false; }
});

/* ---------- Login ---------- */
$("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  $("loginMsg").textContent = "";
  const btn = e.submitter; btn.disabled = true;
  try {
    const { token } = await api("/login", "POST", {
      email: $("lEmail").value,
      password: $("lPassword").value,
    });
    sessionStorage.setItem("token", token);
    e.target.reset();
    location.hash = "#/welcome";
    router();
  } catch (err) {
    $("loginMsg").textContent = err.message;
  } finally { btn.disabled = false; }
});

$("logoutBtn").addEventListener("click", logout);
window.addEventListener("hashchange", router);
router();
