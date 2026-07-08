import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from '../context/ToastContext';
import ProtectedRoute from '../routes/ProtectedRoute';

beforeEach(() => {
  localStorage.clear();
});

describe('ProtectedRoute', () => {
  it('redirects to login when no token', () => {
    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <ToastProvider>
          <Routes>
            <Route path="/admin/login" element={<div data-testid="login-page">Login Page</div>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<div>Dashboard</div>} />
            </Route>
          </Routes>
        </ToastProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('renders children when token exists', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('admin', JSON.stringify({ name: 'Admin', email: 'admin@test.com' }));

    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <ToastProvider>
          <Routes>
            <Route path="/admin/login" element={<div>Login Page</div>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<div>Dashboard</div>} />
            </Route>
          </Routes>
        </ToastProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
