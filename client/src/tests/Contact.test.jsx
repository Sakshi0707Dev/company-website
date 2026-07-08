import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../context/ToastContext';
import Contact from '../pages/Contact';

beforeEach(() => {
  vi.clearAllMocks();
});

const renderContact = () =>
  render(
    <MemoryRouter>
      <ToastProvider>
        <Contact />
      </ToastProvider>
    </MemoryRouter>
  );

describe('Contact Form Validation', () => {
  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    renderContact();

    const submitBtn = screen.getByRole('button', { name: /submit enquiry/i });
    await user.click(submitBtn);

    expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/please provide a valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/please provide a valid phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/subject must be at least 3 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
  });

  it('shows validation error for short name', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText(/name/i), 'A');
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }));

    expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }));

    expect(screen.getByText(/please provide a valid email/i)).toBeInTheDocument();
  });

  it('preserves form values after validation failure', async () => {
    const user = userEvent.setup();
    renderContact();

    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'John');

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'john@example.com');

    await user.click(screen.getByRole('button', { name: /submit enquiry/i }));

    expect(nameInput.value).toBe('John');
    expect(emailInput.value).toBe('john@example.com');
  });
});
