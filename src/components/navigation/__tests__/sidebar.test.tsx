import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '@/components/navigation/sidebar';
import { describe, expect, it, vi } from 'vitest';

describe('Sidebar', () => {
  it('renders the sidebar with the correct links when open', () => {
    render(<Sidebar isOpen={true} toggle={vi.fn()} />);

    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Favourites')).toBeInTheDocument();
  });
;

  it('calls toggle function when close button is clicked', () => {
    const toggleMock = vi.fn();
    render(<Sidebar isOpen={true} toggle={toggleMock} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(toggleMock).toHaveBeenCalled();
  });

  it('renders close button correctly', () => {
    render(<Sidebar isOpen={true} toggle={vi.fn()} />);

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
  });

  it('checks sidebar visibility based on isOpen prop', () => {
    const { rerender } = render(<Sidebar isOpen={true} toggle={vi.fn()} />);

    
    let sidebar = screen.getByRole('button').closest('div');
    expect(sidebar).toHaveStyle('opacity: 1');
    expect(sidebar).toHaveStyle('top: 0');

    
    rerender(<Sidebar isOpen={false} toggle={vi.fn()} />);
    sidebar = screen.getByRole('button').closest('div');
    expect(sidebar).toHaveStyle('opacity: 0');
    expect(sidebar).toHaveStyle('top: -100%');
  });
});
