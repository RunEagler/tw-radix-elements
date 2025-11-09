import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

describe('Card', () => {
  describe('Rendering', () => {
    it('renders card with default props', () => {
      render(<Card data-testid="card">Card content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent('Card content');
    });

    it('renders with all sub-components', () => {
      render(
        <Card data-testid="card">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card Description')).toBeInTheDocument();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
      expect(screen.getByText('Card Footer')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(
        <Card variant="default" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border-border', 'shadow-sm');
    });

    it('renders elevated variant', () => {
      render(
        <Card variant="elevated" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('shadow-md', 'hover:shadow-lg');
    });

    it('renders outlined variant', () => {
      render(
        <Card variant="outlined" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border-2');
    });

    it('renders ghost variant', () => {
      render(
        <Card variant="ghost" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border-transparent');
    });
  });

  describe('Padding', () => {
    it('renders with no padding', () => {
      render(
        <Card padding="none" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
    });

    it('renders with small padding', () => {
      render(
        <Card padding="sm" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-4');
    });

    it('renders with default padding', () => {
      render(
        <Card padding="default" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-6');
    });

    it('renders with large padding', () => {
      render(
        <Card padding="lg" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-8');
    });
  });

  describe('Hover Effects', () => {
    it('renders with no hover effect', () => {
      render(
        <Card hover="none" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
    });

    it('renders with lift hover effect', () => {
      render(
        <Card hover="lift" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hover:-translate-y-1');
    });

    it('renders with glow hover effect', () => {
      render(
        <Card hover="glow" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hover:shadow-xl');
    });

    it('renders with border hover effect', () => {
      render(
        <Card hover="border" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hover:border-primary');
    });
  });

  describe('Sub-components', () => {
    it('renders CardHeader with correct styling', () => {
      render(<CardHeader data-testid="header">Header</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5');
    });

    it('renders CardTitle with correct styling', () => {
      render(<CardTitle>Title</CardTitle>);
      const title = screen.getByText('Title');
      expect(title).toHaveClass('text-2xl', 'font-semibold');
      expect(title.tagName).toBe('H3');
    });

    it('renders CardDescription with correct styling', () => {
      render(<CardDescription>Description</CardDescription>);
      const description = screen.getByText('Description');
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
      expect(description.tagName).toBe('P');
    });

    it('renders CardFooter with correct styling', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('flex', 'items-center', 'p-6 pt-4');
    });
  });

  describe('Edge Cases', () => {
    it('applies custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
    });

    it('renders with combined variants', () => {
      render(
        <Card variant="elevated" padding="lg" hover="lift" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('shadow-md', 'p-8', 'hover:-translate-y-1');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
