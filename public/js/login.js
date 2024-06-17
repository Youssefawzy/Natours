/* eslint-disable */
const loginForm = document.querySelector(".form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await login(email, password);
  });
}

const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      console.log(res);
      // Optionally, redirect or show success message
    } else {
      console.error("Login failed");
    }
  } catch (err) {
    console.log(err);
  }
};
