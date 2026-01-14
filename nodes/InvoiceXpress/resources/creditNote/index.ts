import type { INodeProperties } from 'n8n-workflow';
import { TAX_EXEMPTION_REASONS } from '../../shared/taxExemptionReasons';

const showOnlyForCreditNote = {
  resource: ['creditNote'],
};

const showOnlyForCreditNoteCreate = {
  resource: ['creditNote'],
  operation: ['create'],
};

export const creditNoteDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: showOnlyForCreditNote },
    options: [
      {
        name: 'Create',
        value: 'create',
        action: 'Create credit note',
        description: 'Create a credit note',
        routing: {
          request: {
            method: 'POST',
            url: '=/v2/credit_notes',
            body:
              '={{ ({ credit_note: { date: $parameter.date, due_date: $parameter.due_date, owner_invoice_id: $parameter.owner_invoice_id, tax_exemption_reason: $parameter.tax_exemption_reason || undefined, observations: $parameter.observations || undefined, client: { id: $parameter.client_id || undefined, name: $parameter.client_name || undefined, email: $parameter.client_email || undefined, fiscal_id: $parameter.client_fiscal_id || undefined, address: $parameter.client_address || undefined, postal_code: $parameter.client_postal_code || undefined, country: $parameter.client_country || undefined, code: $parameter.client_code || undefined, city: $parameter.client_city || undefined, phone: $parameter.client_phone || undefined }, items: ($parameter.itemsMode === "json" ? ($parameter.items_json ?? []) : ($parameter.items?.item ?? []).map((i) => ({ name: i.name || undefined, description: i.description || undefined, unit: i.unit || undefined, quantity: i.quantity, unit_price: i.unit_price, tax: i.tax_id ? Number(i.tax_id) : undefined }))) } }) }}',
          },
        },
      },
    ],
    default: 'create',
  },
  {
    displayName: 'Date',
    name: 'date',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Due Date',
    name: 'due_date',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Owner Invoice ID',
    name: 'owner_invoice_id',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Tax Exemption Reason',
    name: 'tax_exemption_reason',
    type: 'options',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
    options: TAX_EXEMPTION_REASONS,
  },
  {
    displayName: 'Observations',
    name: 'observations',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Client ID',
    name: 'client_id',
    type: 'number',
    default: 0,
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Client Name',
    name: 'client_name',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Client Email',
    name: 'client_email',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Client Fiscal ID',
    name: 'client_fiscal_id',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Client Address',
    name: 'client_address',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Client Postal Code',
    name: 'client_postal_code',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Client Country',
    name: 'client_country',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Client Code',
    name: 'client_code',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Client City',
    name: 'client_city',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Client Phone',
    name: 'client_phone',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForCreditNoteCreate },
  },
  {
    displayName: 'Items Input Mode',
    name: 'itemsMode',
    type: 'options',
    default: 'ui',
    required: true,
    displayOptions: { show: showOnlyForCreditNoteCreate },
    options: [
      { name: 'UI', value: 'ui' },
      { name: 'JSON', value: 'json' },
    ],
  },
  {
    displayName: 'Items',
    name: 'items',
    type: 'fixedCollection',
    default: {},
    required: true,
    // allowArbitraryValues: true,
    // requiresDataPath: "single",
    displayOptions: { show: { ...showOnlyForCreditNoteCreate, itemsMode: ['ui'] } },
    typeOptions: {
      multipleValues: true,
      multipleValueButtonText: 'Add Item',
    },
    options: [
      {
        displayName: 'Item',
        name: 'item',
        values: [
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Quantity',
								name: 'quantity',
								type: 'number',
								default: 1,
									required:	true,
							},
							{
								displayName: 'Tax Name or ID',
								name: 'tax_id',
								type: 'options',
								default: '',
								description:
									'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
								typeOptions: {
									loadOptionsMethod: 'getTaxes',
								},
							},
							{
								displayName: 'Unit',
								name: 'unit',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Unit Price',
								name: 'unit_price',
								type: 'number',
								default: 0,
									required:	true,
							},
						],
      },
    ],
  },
  {
    displayName: 'Items (JSON)',
    name: 'items_json',
    type: 'json',
    default: [],
    required: true,
    displayOptions: { show: { ...showOnlyForCreditNoteCreate, itemsMode: ['json'] } },
    description: 'Array of items. Each item should match InvoiceXpress format: { name, description, unit, quantity, unit_price, tax }.',
  },
];
