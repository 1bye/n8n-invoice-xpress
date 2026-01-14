import type {
  IAuthenticateGeneric,
  Icon,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class InvoiceXpressProxyApi implements ICredentialType {
  name = 'invoiceXpressProxyApi';

  displayName = 'InvoiceXpress Proxy API';
		documentationUrl = 'https://github.com/1bye/n8n-nodes-invoice-xpress';

  icon: Icon = {
    light: 'file:../icons/invoice-xpress.svg',
    dark: 'file:../icons/invoice-xpress.dark.svg',
  };

  properties: INodeProperties[] = [
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

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'x-account-name': '={{$credentials.accountName}}',
        'x-api-key': '={{$credentials.apiKey}}',
        'x-env': '={{$credentials.env}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://ix-proxy.kapta.workers.dev',
      url: '/v2/auth/check',
      method: 'GET',
    },
  };
}
