import type { INodeProperties } from 'n8n-workflow';

const showOnlyForChangeState = {
	resource: ['changeState'],
};

const showOnlyForChangeStateChange = {
	resource: ['changeState'],
	operation: ['change'],
};

export const changeStateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForChangeState },
		options: [
			{
				name: 'Change',
				value: 'change',
				action: 'Change state',
				description: 'Change state of invoice/invoice receipt/credit note',
				routing: {
					request: {
						method: 'POST',
						url: '=/v2/change_state',
						body: '={{ ({ id: $parameter.id, type: $parameter.type, state: $parameter.state, actualizeDateBeforeChange: $parameter.actualizeDateBeforeChange }) }}',
					},
				},
			},
		],
		default: 'change',
	},
	{
		displayName: 'Item ID',
		name: 'id',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: { show: showOnlyForChangeStateChange },
		description: 'Invoice/Invoice Receipt/Credit Note ID',
	},
	{
		displayName: 'Type of Item',
		name: 'type',
		type: 'options',
		default: 'invoice',
		required: true,
		displayOptions: { show: showOnlyForChangeStateChange },
		options: [
			{ name: 'Invoice', value: 'invoice' },
			{ name: 'Invoice Receipt', value: 'invoice_receipt' },
			{ name: 'Credit Note', value: 'credit_note' },
		],
	},
	{
		displayName: 'State',
		name: 'state',
		type: 'options',
		default: 'finalized',
		required: true,
		displayOptions: { show: showOnlyForChangeStateChange },
		options: [
			{ name: 'Canceled', value: 'canceled' },
			{ name: 'Deleted', value: 'deleted' },
			{ name: 'Finalized', value: 'finalized' },
			{ name: 'Settled', value: 'settled' },
			{ name: 'Unsettled', value: 'unsettled' },
		],
	},
	{
		displayName: 'Actualize Date Before Change',
		name: 'actualizeDateBeforeChange',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions: { show: showOnlyForChangeStateChange },
		description: 'Whether changing the item’s state will set the date to today (invoice/invoice receipt only)',
	},
];
