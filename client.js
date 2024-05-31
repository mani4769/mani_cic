// JavaScript code here
async function registerUser() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    try {
        const response = await fetch("http://localhost:8000/checkuser", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mail: email, name: name, password: password, phone: phone })
        });
        const data = await response.json();
        console.log("User registered:", data);
    } catch (error) {
        console.error("Error registering user:", error);
    }
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch("http://localhost:8000/retriveuser", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mail: email })
        });
        const data = await response.json();
        if (data && data.Password === password) {
            console.log("Login successful:", data);
            // Display user info after login
            document.getElementById('userInfo').innerHTML = `
                <p>Name: ${data.Name}</p>
                <p>Email: ${data.Gmail}</p>
                <p>Phone: ${data.Phonenubmer}</p>
            `;
            document.getElementById('userInfo').style.display = 'block';
        } else {
            console.log("Login failed: Invalid credentials");
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}
