import type { Meta, StoryObj } from '@storybook/react';

import  Sidebar  from './Sidebar';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'widget/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightAuth: Story = {
  args: {},
};
LightAuth.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({user: {authData: {}}})]

export const DarkAuth: Story = {
  args: {},
};
DarkAuth.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({user: {authData: {}}})]

export const LightNoAuth: Story = {
  args: {},
};
LightNoAuth.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({user: {}})]

export const DarkNoAuth: Story = {
  args: {},
};
DarkNoAuth.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({user: {}})]