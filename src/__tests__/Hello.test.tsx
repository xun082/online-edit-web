// __tests__/Hello.test.tsx
import { render, screen } from '@testing-library/react';

import Hello from '../components/Hello';

describe('Hello Component', () => {
  it('renders the correct greeting', () => {
    render(<Hello name="World" />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('renders the correct greeting with a different name', () => {
    render(<Hello name="Vitest" />);
    expect(screen.getByText('Hello, Vitest!')).toBeInTheDocument();
  });
});
