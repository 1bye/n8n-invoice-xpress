"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taxDescription = void 0;
const showOnlyForTax = {
    resource: ['tax'],
};
exports.taxDescription = [
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
//# sourceMappingURL=index.js.map