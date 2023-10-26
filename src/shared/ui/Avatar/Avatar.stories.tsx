import type { Meta, StoryObj } from '@storybook/react';
import  { Avatar }  from './Avatar';
import Ava from 'shared/assets/icons/ava_from_storybook.jpg'

const meta = {
  title: 'shared/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {    
  } 
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Big: Story = {
  args: {
    size: 150, 
    src: Ava  
  },
};

export const Small: Story = {
  args: {
    size: 75, 
    src: Ava  
  },
};



