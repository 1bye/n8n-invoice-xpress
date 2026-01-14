"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceXpressProxyApi = void 0;
class InvoiceXpressProxyApi {
    constructor() {
        this.name = 'invoiceXpressProxyApi';
        this.displayName = 'InvoiceXpress Proxy API';
        this.documentationUrl = 'https://github.com/1bye/n8n-nodes-invoice-xpress';
        this.icon = {
            light: 'file:../icons/invoice-xpress.svg',
            dark: 'file:../icons/invoice-xpress.dark.svg',
        };
        this.properties = [
            {
                displayName: 'Environment',
                name: 'env',
                type: 'options',
                options: [
                    { name: 'Production', value: 'prod' },
                    { name: 'Development', value: 'dev' },
                ],
                default: 'prod',
            },
            {
                displayName: 'Account Name',
                name: 'accountName',
                type: 'string',
                default: '',
                required: true,
            },
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'x-account-name': '={{$credentials.accountName}}',
                    'x-api-key': '={{$credentials.apiKey}}',
                    'x-env': '={{$credentials.env}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://ix-proxy.kapta.workers.dev',
                url: '/v2/auth/check',
                method: 'GET',
            },
        };
    }
}
exports.InvoiceXpressProxyApi = InvoiceXpressProxyApi;
//# sourceMappingURL=InvoiceXpressProxyApi.credentials.js.map