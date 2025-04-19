// api/guest/auth.js

import users from "@/lib/mocks/users";

export async function simulateLogin(email, password) {
  const user = users.find((u) => u.email === email && u.password_hash === password);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 300); // délai pour simuler API
  });
}
