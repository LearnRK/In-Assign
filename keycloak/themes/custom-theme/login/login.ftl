<html>
<head>
  <title>Custom Login</title>
  <link rel="stylesheet" href="login.css">
</head>
<body>
  <div class="login-container">
    <img src="your-icon.png" alt="Logo">
    <h2>Welcome to Our Custom Login</h2>
    <form action="${url.loginAction}" method="post">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <input type="submit" value="Login">
    </form>
  </div>
</body>
</html>
