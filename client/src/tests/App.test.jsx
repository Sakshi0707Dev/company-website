import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import NotFound from '../pages/NotFound';
import AdminLogin from '../pages/AdminLogin';
import { ToastProvider } from '../context/ToastContext';

function withProviders(Component) {
  return (
    <MemoryRouter>
      <ToastProvider>
        <Component />
      </ToastProvider>
    </MemoryRouter>
  );
}

describe('Home Page', () => {
  it('renders hero section', () => {
    render(withProviders(Home));
    expect(screen.getByText(/Empowering Your Business with Technology/i)).toBeInTheDocument();
  });
});

describe('About Page', () => {
  it('renders company info', () => {
    render(withProviders(About));
    expect(screen.getByText(/About Apex Solutions/i)).toBeInTheDocument();
  });
});

describe('Services Page', () => {
  it('renders all services', () => {
    render(withProviders(Services));
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Development')).toBeInTheDocument();
    expect(screen.getByText('Cloud Solutions')).toBeInTheDocument();
    expect(screen.getByText('AI & Machine Learning')).toBeInTheDocument();
  });
});

describe('404 Page', () => {
  it('renders 404 message', () => {
    render(withProviders(NotFound));
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});

describe('Admin Login Page', () => {
  it('renders login form', () => {
    render(withProviders(AdminLogin));
    expect(screen.getByText('Admin Login')).toBeInTheDocument();
    expect(screen.getByText(/Back to Website/i)).toBeInTheDocument();
  });
});
