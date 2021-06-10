import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const daftar = {
  after_render: () => {
    document
    .getElementById("register-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      showLoading();
      const data = await register({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      });
      hideLoading();
      if (data.error) {
        showMessage(data.error);
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
        <form id="register-form">
          <ul class="form-items">
            <li>
              <h1>Buat Akun Anda</h1>
            </li>
            <li>
              <label for="name">Nama</label>
              <input type="name" name="name" id="name" />
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
              <label for="repassword">Ulangi Password</label>
              <input type="password" name="repassword" id="repassword" />
            </li>
            <li>
              <button type="submit" clas="primary">Daftar</button>
            </li>
            <li>
              <div>
                Sudah Punya Akun ?
                <a  href="/#/login">Login </a>
              </div>
            </li>
          </ul>
        </form>
      </div>
      `
  },
};
export default daftar;