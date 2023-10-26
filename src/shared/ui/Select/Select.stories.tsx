import type { Meta, StoryObj } from '@storybook/react';
import  { Select }  from './Select';
import Ava from 'shared/assets/icons/ava_from_storybook.jpg'

const meta = {
  title: 'shared/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {    
  } 
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Label: Story = {
  args: {
    label: 'Test title',
    options: [
      { value: '1', content: 'первый'},
      { value: '2', content: 'второй'},
      { value: '3', content: 'третий'},
      { value: '4', content: 'четвертый'}
    ]
  },
};

export const NoLabel: Story = {
  args: {    
    options: [
      { value: '1', content: 'первый'},
      { value: '2', content: 'второй'},
      { value: '3', content: 'третий'},
      { value: '4', content: 'четвертый'}
    ]
  },
};



