import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ReactSupervenn from './ReactSupervenn';
import demoJson from './assets/demo.json'

export default {
  title: 'ReactSupervenn',
  component: ReactSupervenn,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  args: demoJson,
} as ComponentMeta<typeof ReactSupervenn>;

const Template: ComponentStory<typeof ReactSupervenn> = (args) => <ReactSupervenn {...args} />;

export const Default = Template.bind({});
