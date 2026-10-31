import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Cargar usuarios existentes o usuario demo inicial
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('lego_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'usr-1',
        name: 'Master Builder',
        email: 'admin@lego.com',
        password: '123',
        avatar: '🧱',
        role: 'VIP Member'
      }
    ];
  });

  // Usuario autenticado actualmente
  const [currentUser, setCurrentUser] = useState(() => {
    const active = localStorage.getItem('lego_active_session');
    if (active) {
      try { return JSON.parse(active); } catch (e) { console.error(e); }
    }
    return null;
  });

  // Guardar catálogo de usuarios cuando se registre alguien nuevo
  useEffect(() => {
    localStorage.setItem('lego_users', JSON.stringify(users));
  }, [users]);

  // Guardar la sesión activa
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lego_active_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lego_active_session');
    }
  }, [currentUser]);

  // Registrar nueva cuenta
  const register = (name, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const exists = users.some(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      throw new Error('Ya existe una cuenta registrada con este correo electrónico.');
    }

    const avatars = ['🧱', '🚀', '🧙‍♂️', '🏎️', '🤖', '👑', '🦸‍♂️'];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      avatar: randomAvatar,
      role: 'LEGO Explorer'
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  // Iniciar sesión
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const userFound = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);
    if (!userFound) {
      throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
    }
    setCurrentUser(userFound);
    return userFound;
  };

  // Cerrar sesión
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);