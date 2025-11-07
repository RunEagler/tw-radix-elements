import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { List, ListItem } from './List';

describe('List', () => {
  it('renders list with items', () => {
    render(
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </List>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders with title and description', () => {
    render(
      <List>
        <ListItem title="Title" description="Description" />
      </List>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <List>
        <ListItem icon={<span data-testid="icon">★</span>} title="With Icon" />
      </List>
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders bordered variant', () => {
    render(
      <List variant="bordered" data-testid="list">
        <ListItem>Item</ListItem>
      </List>
    );

    const list = screen.getByTestId('list');
    expect(list).toHaveClass('border');
  });

  it('renders hoverable items', () => {
    render(
      <List>
        <ListItem hoverable data-testid="item">
          Hoverable
        </ListItem>
      </List>
    );

    const item = screen.getByTestId('item');
    expect(item).toHaveClass('hover:bg-accent', 'cursor-pointer');
  });
});
