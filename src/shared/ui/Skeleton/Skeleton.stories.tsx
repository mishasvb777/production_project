import type { Meta, StoryObj } from '@storybook/react';
import   { Skeleton }   from './Skeleton';
import Ava from 'shared/assets/icons/ava_from_storybook.jpg'

const meta = {
  title: 'shared/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {    
  } 
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Circle: Story = {
  args: {
    border: '50%',
    width: 100,
    height: 100
  },
};

export const Normal: Story = {
  args: {    
    width: 100,
    height: 200
  },
};



