import { login } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";

const LoginScreen = {
  after_render: () => {
    document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = await login({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      });
      if (data.error) {
        alert(data.error);
      } else {
        setUserInfo(data);
        document.location.hash = '/';
      }
    });
  },
  render: () => {
    if (getUserInfo().name) {
      document.location.hash = '/';
    }
    return `
      <div class="form-container">
        <form id="login-form">
          <ul class="form-items">
            <li>
              <h1>Login</h1>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" />
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
            </li>
            <li>
              <button type="submit" clas="primary">Login</button>
            </li>
            <li>
              <div>
                Belum Punya Akun ?
                <a  href="/#/register">Buat Akun Anda </a>
              </div>
            </li>
          </ul>
        </form>
      </div>
      `
  },
};
export default LoginScreen;