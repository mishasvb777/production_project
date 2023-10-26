import type { Meta, StoryObj } from '@storybook/react';
import avatar from 'shared/assets/icons/ava_from_storybook.jpg'
import  ProfileCard from './ProfileCard';
import { Country } from 'entites/Country';
import { Currency } from 'entites/Currency';

const meta = {
  title: 'entites/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: {
      username: 'Admin',
      age: 33,
      avatar: avatar,
      city: 'Krasnodar',
      country: Country.Russia,
      currency: Currency.RUB,
      first: 'Misha',
      lastname: 'Ledovskikh'
    }
  },
};


export const IsLoading: Story = {
  args: {
    isLoading: true
  },
};

export const withError: Story = {
  args: {
    error: 'error'
  },
};


