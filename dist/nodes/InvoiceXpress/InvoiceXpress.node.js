"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceXpress = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const invoice_1 = require("./resources/invoice");
const invoiceReceipt_1 = require("./resources/invoiceReceipt");
const creditNote_1 = require("./resources/creditNote");
const tax_1 = require("./resources/tax");
const changeState_1 = require("./resources/changeState");
class InvoiceXpress {
    constructor() {
        this.description = {
            displayName: 'InvoiceXpress',
            name: 'invoiceXpress',
            icon: {
                light: 'file:../../icons/invoice-xpress.svg',
                dark: 'file:../../icons/invoice-xpress.dark.svg',
            },
            group: ['input'],
            version: 1,
            subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
            description: 'Consume InvoiceXpress via ix-proxy',
            defaults: {
                name: 'InvoiceXpress',
            },
            usableAsTool: true,
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'invoiceXpressProxyApi',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: 'https://ix-proxy.kapta.workers.dev',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Change State',
                            value: 'changeState',
                        },
                        {
                            name: 'Credit Note',
                            value: 'creditNote',
                        },
                        {
                            name: 'Invoice',
                            value: 'invoice',
                        },
                        {
                            name: 'Invoice Receipt',
                            value: 'invoiceReceipt',
                        },
                        {
                            name: 'Tax',
                            value: 'tax',
                        },
                    ],
                    default: 'invoice',
                },
                ...invoice_1.invoiceDescription,
                ...invoiceReceipt_1.invoiceReceiptDescription,
                ...creditNote_1.creditNoteDescription,
                ...tax_1.taxDescription,
                ...changeState_1.changeStateDescription,
            ],
        };
        this.methods = {
            loadOptions: {
                getTaxes: async function () {
                    const res = await this.helpers.httpRequestWithAuthentication.call(this, 'invoiceXpressProxyApi', {
                        method: 'GET',
                        url: 'https://ix-proxy.kapta.workers.dev/v2/taxes',
                        json: true,
                    });
                    const envelope = res && typeof res === 'object' ? res : null;
                    const data = envelope && 'response' in envelope ? envelope.response : envelope;
                    const taxes = data && typeof data === 'object' && 'taxes' in data
                        ? data.taxes
                        : undefined;
                    const items = Array.isArray(taxes) ? taxes : [];
                    return items.reduce((acc, t) => {
                        var _a;
                        const tax = t && typeof t === 'object' ? t : {};
                        const id = Number(tax.id);
                        if (Number.isNaN(id))
                            return acc;
                        const name = String((_a = tax.name) !== null && _a !== void 0 ? _a : '').trim();
                        const value = tax.value;
                        acc.push({
                            name: name ? `${name}${value !== undefined ? ` (${value}%)` : ''}` : String(id),
                            value: id,
                        });
                        return acc;
                    }, []);
                },
            },
        };
    }
}
exports.InvoiceXpress = InvoiceXpress;
//# sourceMappingURL=InvoiceXpress.node.js.map