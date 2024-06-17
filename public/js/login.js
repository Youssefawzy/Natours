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
const logOutBtn = document.querySelector(".nav__el--logout");

if (logOutBtn) logOutBtn.addEventListener("click", logout);

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
      alert("logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data);
    console.log(err);
  }
};

const logout = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/users/logout", {
      method: "GET",
      credentials: "include", // This is used to send cookies with the request
    });

    if (res.ok) {
      const data = await res.json();
      if (data.status === "success") {
        location.reload(true);
      } else {
        showAlert("error", "Error logging out! Try again.");
      }
    } else {
      showAlert("error", "Error logging out! Try again.");
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Error logging out! Try again.");
  }
};
