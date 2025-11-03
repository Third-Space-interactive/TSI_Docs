import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  templatesSidebar: [
    'intro',
    {
      type: 'category',
      label: 'ArchViz Navigation Template',
      collapsed: false,
      items: [
        'archviz-navigation/index',
        {
          type: 'category',
          label: 'Basic Navigation',
          items: [
            'archviz-navigation/basic-navigation/setup',
          ],
        },
        {
          type: 'category',
          label: 'Advanced Navigation',
          items: [
            'archviz-navigation/advanced-navigation/setup',
          ],
        },
        {
          type: 'category',
          label: 'Selection System',
          items: [
            'archviz-navigation/selection-system/index',
          ],
        },
        'archviz-navigation/post-processing-setup',
      ],
    },
  ],
};

export default sidebars;
