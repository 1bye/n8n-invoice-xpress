import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTax = {
	resource: ['tax'],
};

export const taxDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForTax },
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List taxes',
				description: 'List taxes',
				routing: {
					request: {
						method: 'GET',
						url: '=/v2/taxes',
					},
				},
			},
		],
		default: 'list',
	},
];
