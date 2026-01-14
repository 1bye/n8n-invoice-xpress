"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceDescription = void 0;
const taxExemptionReasons_1 = require("../../shared/taxExemptionReasons");
const showOnlyForInvoice = {
    resource: ['invoice'],
};
const showOnlyForInvoiceCreate = {
    resource: ['invoice'],
    operation: ['create'],
};
const showOnlyForInvoiceGet = {
    resource: ['invoice'],
    operation: ['get'],
};
exports.invoiceDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: showOnlyForInvoice },
        options: [
            {
                name: 'Create',
                value: 'create',
                action: 'Create invoice',
                description: 'Create an invoice',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/v2/invoices',
                        body: '={{ ({ invoice: { date: $parameter.date, due_date: $parameter.due_date, tax_exemption_reason: $parameter.tax_exemption_reason || undefined, observations: $parameter.observations || undefined, client: { id: $parameter.client_id || undefined, name: $parameter.client_name || undefined, email: $parameter.client_email || undefined, fiscal_id: $parameter.client_fiscal_id || undefined, address: $parameter.client_address || undefined, postal_code: $parameter.client_postal_code || undefined, country: $parameter.client_country || undefined, code: $parameter.client_code || undefined, city: $parameter.client_city || undefined, phone: $parameter.client_phone || undefined }, items: ($parameter.itemsMode === "json" ? ($parameter.items_json ?? []) : ($parameter.items?.item ?? []).map((i) => ({ name: i.name || undefined, description: i.description || undefined, unit: i.unit || undefined, quantity: i.quantity, unit_price: i.unit_price, tax: i.tax_id || undefined }))) } }) }}',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get invoice',
                description: 'Get an invoice by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/v2/invoices/{{$parameter.id}}',
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
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Due Date',
        name: 'due_date',
        type: 'dateTime',
        default: '',
        required: true,
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Tax Exemption Reason',
        name: 'tax_exemption_reason',
        type: 'options',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
        options: taxExemptionReasons_1.TAX_EXEMPTION_REASONS,
    },
    {
        displayName: 'Observations',
        name: 'observations',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Client ID',
        name: 'client_id',
        type: 'number',
        default: 0,
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Client Name',
        name: 'client_name',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Client Email',
        name: 'client_email',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Client Fiscal ID',
        name: 'client_fiscal_id',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Client Address',
        name: 'client_address',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Client Postal Code',
        name: 'client_postal_code',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Client Country',
        name: 'client_country',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Client Code',
        name: 'client_code',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Client City',
        name: 'client_city',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Client Phone',
        name: 'client_phone',
        type: 'string',
        default: '',
        displayOptions: { show: showOnlyForInvoiceCreate },
    },
    {
        displayName: 'Items Input Mode',
        name: 'itemsMode',
        type: 'options',
        default: 'ui',
        required: true,
        displayOptions: { show: showOnlyForInvoiceCreate },
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
        displayOptions: { show: { ...showOnlyForInvoiceCreate, itemsMode: ['ui'] } },
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
                        required: true,
                    },
                    {
                        displayName: 'Tax',
                        name: 'tax_id',
                        type: 'options',
                        default: '',
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
                        required: true,
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
        displayOptions: { show: { ...showOnlyForInvoiceCreate, itemsMode: ['json'] } },
        description: 'Array of items. Each item should match InvoiceXpress format: { name, description, unit, quantity, unit_price, tax }.',
    },
    {
        displayName: 'Invoice ID',
        name: 'id',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { show: showOnlyForInvoiceGet },
    },
];
//# sourceMappingURL=index.js.map