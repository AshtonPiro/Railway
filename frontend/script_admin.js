// Session Management: Redirect to LOGIN.html if not logged in
window.onload = () => {
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.endsWith('LOGIN.html');
    const isAdminPage = currentPath.endsWith('ADMIN.html');

    // Check if the user is logged in
    if (!sessionStorage.role) {
        if (!isLoginPage) {
            location.href = 'INBOX.html';
        }
    } else {
        // User is logged in, check the role and redirect accordingly
        if (isAdminPage && sessionStorage.role !== 'ADMIN.html') {
            location.href = 'USER.html'; // Redirect non-admin users from ADMIN page
        }
    }
};

// Add event listener for Register New User
document.getElementById('register-new-user').addEventListener('click', (e) => {
    document.querySelector('#main-content').innerHTML = `
        <div class="form-container">
            <h2>Register New User</h2>
            <form id="registration-form">
                <div class="form-group">
                    <label for="employee-id">Employee ID</label>
                    <input type="text" id="employee-id" name="employee-id" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="role">Role</label>
                    <select id="role" name="role" required>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button class='submit-button' type="submit">Submit</button>
                </div>
            </form>
            <h3 id="status"></h3>
        </div>
    `;
    const submitButton = document.querySelector('.form-actions button[type="submit"]');
    let formData = {};
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent form from submitting the traditional way

        // Get form values
        formData = {
            employeeId: document.getElementById('employee-id').value,
            password: document.getElementById('password').value,
            name: document.getElementById('name').value,
            role: document.getElementById('role').value
        };
        console.log(formData);

        // Check if all form data is filled
        if (!formData.employeeId || !formData.password || !formData.name || !formData.role) {
            document.getElementById('status').textContent = 'Please fill out all fields';
            return;
        }

        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Define the request URL
        const url = "http://127.0.0.1:5000/register";

        // Configure the request
        xhr.open("POST", url);

        // Set the request header for JSON data
        xhr.setRequestHeader("Content-Type", "application/json");

        // Define the onload function to handle the response
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Request was successful
                const responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
                // Process the response data here
                if (responseData.success) {
                    document.getElementById('status').textContent = 'Registration successful!';
                } else {
                    document.getElementById('status').textContent = 'Registration failed: ' + responseData.message;
                }
            } else {
                // Request failed
                console.error("Error:", xhr.status);
                document.getElementById('status').textContent = 'Registration failed: ' + xhr.statusText;
            }
        };

        // Define the onerror function to handle errors
        xhr.onerror = function () {
            console.error("Request failed");
            document.getElementById('status').textContent = 'Registration failed: Request failed';
        };

        // Send the request with JSON payload
        xhr.send(JSON.stringify(formData));
    });
});

// Add event listener for Activate/Deactivate User
document.getElementById('activate-deactivate-user').addEventListener('click', (e) => {
    document.querySelector('#main-content').innerHTML = `
        <div class="form-container">
            <h2>Activate/Deactivate User</h2>
            <form id="activation-form">
                <div class="form-group">
                    <label for="employee-id">Employee ID</label>
                    <input type="text" id="employee-id" name="employee-id" required>
                </div>
                <div class="form-group">
                    <label for="action">Action</label>
                    <select id="action" name="action" required>
                        <option value="activate">Activate</option>
                        <option value="deactivate">Deactivate</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button class='submit-button' type="submit">Submit</button>
                </div>
            </form>
            <h3 id="status"></h3>
        </div>
    `;
    const activationButton = document.querySelector('.form-actions button[type="submit"]');
    let formData = {};
    activationButton.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent form from submitting the traditional way

        // Get form values
        formData = {
            employeeId: document.getElementById('employee-id').value,
            action: document.getElementById('action').value
        };
        console.log(formData);

        // Check if all form data is filled
        if (!formData.employeeId || !formData.action) {
            document.getElementById('status').textContent = 'Please fill out all fields';
            return;
        }

        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Define the request URL
        const url = "http://127.0.0.1:5000/activate_deactivate_user";

        // Configure the request
        xhr.open("POST", url);

        // Set the request header for JSON data
        xhr.setRequestHeader("Content-Type", "application/json");

        // Define the onload function to handle the response
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Request was successful
                const responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
                // Process the response data here
                if (responseData.success) {
                    document.getElementById('status').textContent = 'Action successful!';
                } else {
                    document.getElementById('status').textContent = 'Action failed: ' + responseData.message;
                }
            } else {
                // Request failed
                console.error("Error:", xhr.status);
                document.getElementById('status').textContent = 'Action failed: ' + xhr.statusText;
            }
        };

        // Define the onerror function to handle errors
        xhr.onerror = function () {
            console.error("Request failed");
            document.getElementById('status').textContent = 'Action failed: Request failed';
        };

        // Send the request with JSON payload
        xhr.send(JSON.stringify(formData));
    });
});

// Add event listener for Reports
document.getElementById('reports').addEventListener("click", (e) => {

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Define the request URL
    const url = `http://127.0.0.1:5000/reports`;
    console.log(url);

    // Configure the request
    xhr.open("GET", url);

    // Define the onload function to handle the response
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Request was successful
            const responseData = JSON.parse(xhr.responseText);
            // Process the response data here
            console.log(responseData);
            const main_content = document.querySelector('#main-content');
            main_content.innerHTML = `
            <table class="table" id="report-table">
            <tr>
                <th>COMPLAINT ID</th>
                <th>DATE</th>
                <th>EMPLOYEE NO</th>
                <th>EMPLOYEE NAME</th>
                <th>DIVISION</th>
                <th>DEPARTMENT</th>
                <th>WEBSITE</th>
                <th>MODULE</th>
                <th>DESC</th>
                <th>REFERENCE DOCUMENT</th>
                <th>STATUS</th>
            </tr>
            <!-- Table rows can be added here as needed -->
            </table>`;
            const data = responseData['data'];
            console.log(responseData);
            for (let i = 0; i < data.length; i++) {
                const newData = {
                    complaintId: data[i][0],
                    empNo: data[i][1],
                    empName: data[i][2],
                    division: data[i][3],
                    department: data[i][4],
                    website: data[i][5],
                    module: data[i][6],
                    description: data[i][7],
                    document: data[i][8],
                    date: data[i][9],
                    status: data[i][10]
                };

                const newRow = `
                <tr class='row'>
                    <td>${newData.complaintId}</td>
                    <td>${newData.date}</td>
                    <td>${newData.empNo}</td>
                    <td>${newData.empName}</td>
                    <td>${newData.division}</td>
                    <td>${newData.department}</td>
                    <td>${newData.website}</td>
                    <td>${newData.module}</td>
                    <td>${newData.description}</td>
                    <td>${newData.document}</td>
                    <td>${newData.status}</td>
                </tr>`;
                document.querySelector("#report-table").insertAdjacentHTML("beforeend", newRow);
            }
        } else {
            // Request failed
            console.error("Error:", xhr.status);
        }
    };

    // Define the onerror function to handle errors
    xhr.onerror = function () {
        console.error("Request failed");
    };

    // Send the request
    xhr.send();
});
