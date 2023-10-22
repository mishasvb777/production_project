import type { Meta, StoryObj } from '@storybook/react';
import  Text, { TextTheme }  from './Text';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';


const meta = {
  title: 'shared/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const titleAndText: Story = {
  args: {    
    title: 'Title',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse vitae soluta eius ipsum aspernatur magni? Veritatis dolore, dolorum expedita sit eum, ipsa dignissimos sequi sed esse, dolorem delectus qui ratione?'
  },
};

export const onlyTitle: Story = {
  args: {    
    title: 'Title',
  },
};

export const onlyText: Story = {
  args: {    
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse vitae soluta eius ipsum aspernatur magni? Veritatis dolore, dolorum expedita sit eum, ipsa dignissimos sequi sed esse, dolorem delectus qui ratione?'
  },
};

export const titleAndTextDark: Story = {
  args: {    
    title: 'Title',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse vitae soluta eius ipsum aspernatur magni? Veritatis dolore, dolorum expedita sit eum, ipsa dignissimos sequi sed esse, dolorem delectus qui ratione?'
  },
};
titleAndTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTitleDark: Story = {
  args: {    
    title: 'Title',
  },
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTextDark: Story = {
  args: {    
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse vitae soluta eius ipsum aspernatur magni? Veritatis dolore, dolorum expedita sit eum, ipsa dignissimos sequi sed esse, dolorem delectus qui ratione?'
  },
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const errorText: Story = {
  args: {    
    title: 'Title',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse vitae soluta eius ipsum aspernatur magni? Veritatis dolore, dolorum expedita sit eum, ipsa dignissimos sequi sed esse, dolorem delectus qui ratione?',
    theme: TextTheme.ERROR
  },
};
