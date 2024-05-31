const Insert = async () => {
    try {
        const response = await fetch("http://localhost:8000/checkuser", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                mail: document.getElementById("email").value, 
                fullname: document.getElementById("fullname").value, 
                phoneno: document.getElementById("phoneno").value, 
                registrationno: document.getElementById("reg").value, 
                branch: document.getElementById("branch").value, 
                section: document.getElementById("section").value,
                year: document.getElementById("year").value, 
                teamnames: document.getElementById("teamnames").value,
            })
        });
        const data = await response.json();
        if (data.ok) {
            console.log("Registration successful");
            Retrive();
        } else {
            console.log("Registration failed");
            // Provide feedback to the user, e.g., display an error message
        }
    } catch (error) {
        console.error("Error inserting data:", error);
        // Provide feedback to the user, e.g., display an error message
    }
}

const Retrieve = async () => {
    try {
        const registrationNo = document.getElementById('reg').value;
        if (!registrationNo) {
            window.alert("Please enter registration number");
            return;
        }

        const response = await fetch("http://localhost:8000/retrieveuser", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registrationno: registrationNo })
        });
        
        const userdata = await response.json();
        if (userdata && userdata.FULLNAME) {
            console.log("Retrieved user data:", userdata);
            localStorage.setItem("data", JSON.stringify(userdata)); 
     
            setTimeout(() => {
                window.location.href = "examportal.html";
            }, 1000);
        } else {
            window.alert("Invalid registration number or user data not found");
        }
    } catch (error) {
        console.error("Error retrieving data:", error);
        // Provide feedback to the user, e.g., display an error message
    }
}

const userData = JSON.parse(localStorage.getItem("data")); 

if (userData) {
    document.getElementById("FULLNAME").innerHTML = userData.FULLNAME; 
    document.getElementById("EMAIL").innerHTML = userData.Mail;
    document.getElementById("phoneno").innerHTML = userData.PHONENUMBER;
    document.getElementById("regno").innerHTML = userData.REGISTRATIONNUMBER; 
    document.getElementById("branch").innerHTML = userData.BRANCH;
    document.getElementById("section").innerHTML = userData.SECTION;
    document.getElementById("year").innerHTML = userData.YEAR;

    // Ensure that the elements with IDs exist in the HTML file
} else {
    console.log("No user data found in localStorage");
}

Insert();
