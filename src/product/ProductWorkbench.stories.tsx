import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { DecisionWorkbench } from './DecisionWorkbench';
import { ExperimentCenter } from './ExperimentCenter';

function ProductStudio() { return <MemoryRouter><div className="min-h-screen space-y-8 bg-[#fffaf2] p-8 dark:bg-[#120d13]"><DecisionWorkbench /><ExperimentCenter /></div></MemoryRouter>; }
const meta = { title: 'Product/Decision Studio', component: ProductStudio, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof ProductStudio>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
