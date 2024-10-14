<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intugine Technologies</title>
    <link rel="icon" href="${url.resourcesPath}/img/logo.png" type="image/png">
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            display: flex;
            height: 100vh;
        }
        .left-section {
            width: 60%;
            background: url('${url.resourcesPath}/img/background.png') no-repeat center center;
            background-size: cover;
        }
        .right-section {
            width: 40%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 40px;
            background-color: #FFFFFF;
        }
        .login-form {
            max-width: 320px;
            margin: 0 auto;
        }
        .login-form img {
            width: 60px;
            margin-bottom: 16px;
        }
        .login-form h1 {
            font-size: 22px;
            margin-bottom: 8px;
            color: #2C64C6;
        }
        .login-form p {
            font-size: 14px;
            color: #666666;
            margin-bottom: 24px;
        }
        .login-form input {
            width: 92.5%;
            padding: 10px;
            margin-bottom: 16px;
            border-radius: 4px;
            border: 1px solid #E0E0E0;
        }
        .login-form button {
            width: 100%;
            padding: 12px;
            background-color: #2C64C6;
            color: #FFFFFF;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="left-section"></div> <!-- Reintroduced background image in the left section -->
    <div class="right-section">
        <div class="login-form">
            <img src="${url.resourcesPath}/img/logo.png" alt="Logo">
            <h1>Intugine Technologies</h1>
            <p>Logistics Through Innovation</p>

            <form action="${url.loginAction}" method="post">
                <input type="text" id="username" name="username" placeholder="Username" required>
                <input type="password" id="password" name="password" placeholder="Password" required>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    </div>
</body>
</html>
