import type { Story } from '@ladle/react';
import { List, ListItem } from './List';

export const Default: Story = () => (
  <List>
    <ListItem title="First Item" description="This is the first item description" />
    <ListItem title="Second Item" description="This is the second item description" />
    <ListItem title="Third Item" description="This is the third item description" />
  </List>
);

export const Variants: Story = () => (
  <div className="flex flex-col gap-8">
    <div>
      <h3 className="mb-4 text-lg font-semibold">Default</h3>
      <List variant="default">
        <ListItem title="Item 1" description="Default variant list item" />
        <ListItem title="Item 2" description="No borders or separators" />
        <ListItem title="Item 3" description="Simple and clean" />
      </List>
    </div>

    <div>
      <h3 className="mb-4 text-lg font-semibold">Bordered</h3>
      <List variant="bordered">
        <ListItem title="Item 1" description="Bordered variant list item" />
        <ListItem title="Item 2" description="With border and dividers" />
        <ListItem title="Item 3" description="Contained appearance" />
      </List>
    </div>

    <div>
      <h3 className="mb-4 text-lg font-semibold">Separated</h3>
      <List variant="separated">
        <ListItem title="Item 1" description="Separated variant list item" />
        <ListItem title="Item 2" description="Each item has its own border" />
        <ListItem title="Item 3" description="Spaced appearance" />
      </List>
    </div>
  </div>
);

export const WithIcons: Story = () => (
  <div className="flex flex-col gap-8">
    <div>
      <h3 className="mb-4 text-lg font-semibold">Default with Icons</h3>
      <List variant="default">
        <ListItem
          icon={
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          title="Email Notification"
          description="Receive email updates about your account"
        />
        <ListItem
          icon={
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          }
          title="Push Notifications"
          description="Get push notifications on your device"
        />
        <ListItem
          icon={
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          }
          title="SMS Alerts"
          description="Text message notifications for important updates"
        />
      </List>
    </div>

    <div>
      <h3 className="mb-4 text-lg font-semibold">Bordered with Icons</h3>
      <List variant="bordered">
        <ListItem
          icon={
            <svg
              className="h-5 w-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          title="Task Completed"
          description="Your task has been successfully completed"
        />
        <ListItem
          icon={
            <svg
              className="h-5 w-5 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          title="Task Pending"
          description="This task is waiting for approval"
        />
        <ListItem
          icon={
            <svg
              className="h-5 w-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          title="Task Failed"
          description="This task encountered an error"
        />
      </List>
    </div>
  </div>
);

export const Hoverable: Story = () => (
  <div className="flex flex-col gap-8">
    <div>
      <h3 className="mb-4 text-lg font-semibold">Default with Hover</h3>
      <List variant="default">
        <ListItem
          hoverable
          title="Clickable Item 1"
          description="Hover over this item to see the effect"
        />
        <ListItem hoverable title="Clickable Item 2" description="This item is interactive" />
        <ListItem hoverable title="Clickable Item 3" description="Click to perform an action" />
      </List>
    </div>

    <div>
      <h3 className="mb-4 text-lg font-semibold">Bordered with Hover</h3>
      <List variant="bordered">
        <ListItem
          hoverable
          icon={
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          title="Document 1"
          description="Click to view document details"
        />
        <ListItem
          hoverable
          icon={
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          title="Document 2"
          description="Click to view document details"
        />
      </List>
    </div>

    <div>
      <h3 className="mb-4 text-lg font-semibold">Separated with Hover</h3>
      <List variant="separated">
        <ListItem
          hoverable
          icon={
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          }
          title="Project Alpha"
          description="Click to open project"
        />
        <ListItem
          hoverable
          icon={
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          }
          title="Project Beta"
          description="Click to open project"
        />
      </List>
    </div>
  </div>
);

export const CustomContent: Story = () => (
  <div className="flex flex-col gap-8">
    <div>
      <h3 className="mb-4 text-lg font-semibold">With Custom Actions</h3>
      <List variant="bordered">
        <ListItem
          icon={
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">John Doe</div>
              <div className="text-sm text-muted-foreground mt-0.5">john@example.com</div>
            </div>
            <button
              type="button"
              className="rounded bg-primary px-3 py-1 text-sm text-white hover:opacity-90"
            >
              Follow
            </button>
          </div>
        </ListItem>
        <ListItem
          icon={
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Jane Smith</div>
              <div className="text-sm text-muted-foreground mt-0.5">jane@example.com</div>
            </div>
            <button
              type="button"
              className="rounded bg-primary px-3 py-1 text-sm text-white hover:opacity-90"
            >
              Follow
            </button>
          </div>
        </ListItem>
      </List>
    </div>

    <div>
      <h3 className="mb-4 text-lg font-semibold">With Metadata</h3>
      <List variant="separated">
        <ListItem
          icon={
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100 dark:bg-blue-900">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">JS</span>
            </div>
          }
        >
          <div>
            <div className="font-medium text-foreground">main.js</div>
            <div className="text-sm text-muted-foreground mt-0.5">Modified 2 hours ago</div>
            <div className="mt-2 flex gap-2">
              <span className="inline-flex items-center rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-muted-foreground">
                JavaScript
              </span>
              <span className="inline-flex items-center rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-muted-foreground">
                2.4 KB
              </span>
            </div>
          </div>
        </ListItem>
        <ListItem
          icon={
            <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-100 dark:bg-purple-900">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">TS</span>
            </div>
          }
        >
          <div>
            <div className="font-medium text-foreground">types.ts</div>
            <div className="text-sm text-muted-foreground mt-0.5">Modified 1 day ago</div>
            <div className="mt-2 flex gap-2">
              <span className="inline-flex items-center rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-muted-foreground">
                TypeScript
              </span>
              <span className="inline-flex items-center rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-muted-foreground">
                1.8 KB
              </span>
            </div>
          </div>
        </ListItem>
      </List>
    </div>
  </div>
);

export const SimpleList: Story = () => (
  <List variant="bordered">
    <ListItem title="Settings" />
    <ListItem title="Privacy" />
    <ListItem title="Security" />
    <ListItem title="Notifications" />
    <ListItem title="Help" />
  </List>
);

export const NavigationList: Story = () => (
  <List variant="default" className="w-64">
    <ListItem
      hoverable
      icon={
        <svg
          className="h-5 w-5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      }
      title="Home"
    />
    <ListItem
      hoverable
      icon={
        <svg
          className="h-5 w-5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
      title="Search"
    />
    <ListItem
      hoverable
      icon={
        <svg
          className="h-5 w-5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      }
      title="Profile"
    />
    <ListItem
      hoverable
      icon={
        <svg
          className="h-5 w-5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      }
      title="Settings"
    />
  </List>
);
