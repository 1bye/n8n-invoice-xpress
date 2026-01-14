import {
  NodeConnectionTypes,
  type ILoadOptionsFunctions,
  type INodePropertyOptions,
  type INodeType,
  type INodeTypeDescription,
} from 'n8n-workflow';
import { invoiceDescription } from './resources/invoice';
import { invoiceReceiptDescription } from './resources/invoiceReceipt';
import { creditNoteDescription } from './resources/creditNote';
import { taxDescription } from './resources/tax';
import { changeStateDescription } from './resources/changeState';

// Flex changes

export class InvoiceXpress implements INodeType {
  description: INodeTypeDescription = {
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
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
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
      ...invoiceDescription,
      ...invoiceReceiptDescription,
      ...creditNoteDescription,
      ...taxDescription,
      ...changeStateDescription,
    ],
  };

  methods = {
    loadOptions: {
      getTaxes: async function (this: ILoadOptionsFunctions) {
        const res = await this.helpers.httpRequestWithAuthentication.call(
          this,
          'invoiceXpressProxyApi',
          {
            method: 'GET',
            url: 'https://ix-proxy.kapta.workers.dev/v2/taxes',
            json: true,
          },
        );

        const envelope = res && typeof res === 'object' ? (res as Record<string, unknown>) : null;
        const data = envelope && 'response' in envelope ? envelope.response : envelope;
        const taxes =
          data && typeof data === 'object' && 'taxes' in (data as Record<string, unknown>)
            ? (data as Record<string, unknown>).taxes
            : undefined;
        const items = Array.isArray(taxes) ? taxes : [];

        return items.reduce<INodePropertyOptions[]>((acc, t: unknown) => {
          const tax = t && typeof t === 'object' ? (t as Record<string, unknown>) : {};
          const id = Number(tax.id);
          if (Number.isNaN(id)) return acc;

          const name = String(tax.name ?? '').trim();
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
