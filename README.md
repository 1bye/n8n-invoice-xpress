# n8n-nodes-invoice-xpress

This is an n8n community node. It lets you use InvoiceXpress in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Invoice
	- Create
	- Get
- Invoice Receipt
	- Create
	- Get
- Credit Note
	- Create
- Tax
	- List
- Change State
	- Change state of invoice/invoice receipt/credit note

## Credentials

This node uses an InvoiceXpress API key via the `ix-proxy` service.

Create credentials of type `InvoiceXpress Proxy API` and set:

1. `Proxy Base URL` (defaults to `https://ix-proxy.kapta.workers.dev`)
2. `Environment` (`prod` or `dev`)
3. `Account Name`
4. `API Key`

## Compatibility

Compatible with n8n@1.60.0 or later

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [InvoiceXpress API v2 docs](https://invoicexpress.com/api-v2)
