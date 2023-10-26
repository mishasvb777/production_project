import type { Meta, StoryObj } from '@storybook/react';
import  ProfilePage  from './ProfilePage';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import avatar from 'shared/assets/icons/ava_from_storybook.jpg'
import { Country } from 'entites/Country';
import { Currency } from 'entites/Currency';

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
Light.decorators = [StoreDecorator({
  profile: {
    form: {
      username: 'Admin',
      age: 33,
      avatar: avatar,
      city: 'Krasnodar',
      country: Country.Russia,
      currency: Currency.RUB,
      first: 'Misha',
      lastname: 'Ledovskikh'
    }
  }
})]

export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      username: 'Admin',
      age: 33,
      avatar: avatar,
      city: 'Krasnodar',
      country: Country.Russia,
      currency: Currency.RUB,
      first: 'Misha',
      lastname: 'Ledovskikh'
    }
  }
})]
