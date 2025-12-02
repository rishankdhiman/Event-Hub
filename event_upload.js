import { db } from "./js/firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// --- UPLOAD IMAGE TO IMGBB ---
async function uploadToImgBB(file) {
  const form = new FormData();
  form.append("image", file);

  const apiKey = "a7ec381359cdc2b874f1f8a6095c79b5"; 

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: form
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error("ImgBB upload failed");
  }

  return data.data.url;
}

// --- EVENT UPLOAD FUNCTION ---
document.getElementById("uploadBtn").addEventListener("click", async () => {
  const msg = document.getElementById("msg");
  const poster = document.getElementById("poster").files[0];
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value; // yyyy-mm-dd
  const venue = document.getElementById("venue").value;
  const description = document.getElementById("description").value;

  // Validation
  if (!poster || !title || !date || !venue || !description) {
    msg.innerText = "Please fill all fields";
    msg.style.color = "red";
    return;
  }

  msg.innerText = "Uploading...";
  msg.style.color = "blue";

  // 1️⃣ Upload image to ImgBB
  let posterUrl = "";
  try {
    posterUrl = await uploadToImgBB(poster);
  } catch (err) {
    msg.innerText = "Image upload failed ❌";
    msg.style.color = "red";
    return;
  }

  // 2️⃣ Add event to Firestore → eventDetails collection
  try {
    await addDoc(collection(db, "eventDetails"), {
      title,
      date: new Date(date),       // Firestore Timestamp
      venue,
      description,
      poster: posterUrl,          // ImgBB link
      createdAt: new Date()
    });

    msg.innerText = "Event uploaded successfully 🎉";
    msg.style.color = "green";

    // After 1 second → redirect to admin dashboard
    setTimeout(() => {
      window.location.href = "admin_dashboard.html";
    }, 1000);

  } catch (err) {
    msg.innerText = "Failed to save event ❌";
    msg.style.color = "red";
  }
});
