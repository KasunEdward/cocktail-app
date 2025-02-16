import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '@/components/navigation/navbar';
import { describe, expect, it, vi } from 'vitest';

describe('NavBar', () => {
  it('renders the navbar with the correct links and logo', () => {
    render(<NavBar toggle={vi.fn()} />);

    // Check if the "Cocktail Hub" logo is present
    expect(screen.getByText('Cocktail Hub')).toBeInTheDocument();

    // Check if the navigation links are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Favourites')).toBeInTheDocument();
  });

  it('calls toggle function when the hamburger menu button is clicked', () => {
    const toggleMock = vi.fn();
    render(<NavBar toggle={toggleMock} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(toggleMock).toHaveBeenCalled();
  });

  it('should render the mobile menu button correctly', () => {
    render(<NavBar toggle={vi.fn()} />);
    
    
    const hamburgerButton = screen.getByRole('button');
    expect(hamburgerButton).toBeInTheDocument();
  });


  it('should display links for larger screens', () => {
    render(<NavBar toggle={vi.fn()} />);
    
    const links = screen.getByText('Home');
    expect(links).toBeInTheDocument();
  });
});
