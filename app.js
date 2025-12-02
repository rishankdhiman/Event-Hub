import { db } from "/js/firebase.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

function showError(msg) {
  let box = document.getElementById("errorBox");
  box.innerText = msg;
  box.style.color = "red";
  box.style.marginBottom = "10px";
  box.style.textAlign = "center";
}

// STUDENT REGISTRATION
document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = e.submitter;
  btn.disabled = true;
  btn.innerText = "Registering...";

  const qid = document.getElementById("s_qid").value;

  const exists = await getDocs(query(collection(db, "students"), where("qid", "==", qid)));
  if (!exists.empty) {
    showError("A student with this QID already exists.");
    btn.disabled = false;
    btn.innerText = "Register";
    return;
  }

  await addDoc(collection(db, "students"), {
    name: document.getElementById("s_name").value,
    qid: qid,
    email: document.getElementById("s_email").value,
    password: document.getElementById("s_password").value,
    program: document.getElementById("s_program").value,
    branch: document.getElementById("s_branch").value,
    timestamp: new Date()
  });

  window.location.href = "success.html";
});

// ADMIN REGISTRATION
document.getElementById("adminForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = e.submitter;
  btn.disabled = true;
  btn.innerText = "Registering...";

  const qid = document.getElementById("a_qid").value;

  const exists = await getDocs(query(collection(db, "admins"), where("qid", "==", qid)));
  if (!exists.empty) {
    showError("An admin with this QID already exists.");
    btn.disabled = false;
    btn.innerText = "Register";
    return;
  }

  await addDoc(collection(db, "admins"), {
    name: document.getElementById("a_name").value,
    qid: qid,
    email: document.getElementById("a_email").value,
    password: document.getElementById("a_password").value,
    branch: document.getElementById("a_branch").value,
    reference: document.getElementById("a_ref").value,
    timestamp: new Date()
  });

  window.location.href = "success.html";
});
