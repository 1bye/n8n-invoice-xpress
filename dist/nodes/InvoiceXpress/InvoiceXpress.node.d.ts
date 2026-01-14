import { type ILoadOptionsFunctions, type INodePropertyOptions, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
export declare class InvoiceXpress implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getTaxes: (this: ILoadOptionsFunctions) => Promise<INodePropertyOptions[]>;
        };
    };
}
