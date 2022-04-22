import { MIPaletteCategory } from './MIPaletteCategory';
export const PaletteModel:MIPaletteCategory[] = [
    {
        name: 'Process analysis',
        items: [
            {
                icon: '\\f0a4',
                label: 'Performance Explorer'
            },
            {
                icon: '\\f0a4',
                label: 'Frequency Explorer'
            },
            {
                icon: '\\f13b',
                label: 'Variant Explorer'
            },
            {
                icon: '\\f13f',
                label: 'Activity Explorer'
            },
            {
                icon: '\\f13e',
                label: 'Connection Slider'
            }
        ]
    },
    {
        name: 'Resource analysis',
        items: [
            {
                icon: '\\f007',
                label: 'Performance Explorer'
            },
            {
                icon: '\\f007',
                label: 'Frequency Explorer'
            }
        ]
    },
    {
        name: 'Charts',
        items: [
            {
                icon: '\\f147',
                label: 'Activity Frequency'
            },
            {
                icon: '\\f147',
                label: 'Activity Mean Duration'
            },
            {
                icon: '\\f147',
                label: 'Activity Median Duration'
            },
            {
                icon: '\\f147',
                label: 'Duration Range'
            }
        ]
    }
]