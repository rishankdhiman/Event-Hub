import { db } from "./js/firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

function showError(msg) {
  const box = document.getElementById("errorBox");
  box.innerText = msg;
  box.style.color = "red";
  box.style.marginBottom = "8px";
  box.style.textAlign = "center";
}

// ---- STUDENT LOGIN ----
document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = e.submitter;
  btn.disabled = true;
  btn.innerText = "Please wait...";

  const qid = document.getElementById("s_qid").value.trim();
  const password = document.getElementById("s_password").value.trim();

  const q = query(collection(db, "students"), where("qid", "==", qid), where("password", "==", password));
  const result = await getDocs(q);

  if (result.empty) {
    showError("Invalid QID or Password");
    btn.disabled = false;
    btn.innerText = "Login";
    return;
  }

  sessionStorage.setItem("userType", "student");
  sessionStorage.setItem("userQID", qid);
  window.location.href = "index.html";
});

// ---- ADMIN LOGIN ----
document.getElementById("adminForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = e.submitter;
  btn.disabled = true;
  btn.innerText = "Please wait...";

  const qid = document.getElementById("a_qid").value.trim();
  const password = document.getElementById("a_password").value.trim();

  const q = query(collection(db, "admins"), where("qid", "==", qid), where("password", "==", password));
  const result = await getDocs(q);

  if (result.empty) {
    showError("Invalid QID or Password");
    btn.disabled = false;
    btn.innerText = "Login";
    return;
  }

  sessionStorage.setItem("userType", "admin");
  sessionStorage.setItem("userQID", qid);
  window.location.href = "index.html";
});


