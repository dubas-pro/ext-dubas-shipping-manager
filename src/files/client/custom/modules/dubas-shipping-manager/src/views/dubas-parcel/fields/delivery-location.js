Espo.define('dubas-shipping-manager:views/dubas-parcel/fields/delivery-location', 'views/fields/link', function (Dep) {

    return Dep.extend({

        forceSelectAllAttributes: true,

        select: function (model) {
            Dep.prototype.select.call(this, model);

            this.model.set('deliveryAddressStreet', model.get('addressStreet'));
            this.model.set('deliveryAddressCity', model.get('addressCity'));
            this.model.set('deliveryAddressState', model.get('addressState'));
            this.model.set('deliveryAddressCountry', model.get('addressCountry'));
            this.model.set('deliveryAddressPostalCode', model.get('addressPostalCode'));

            this.model.set('deliveryInstructions', model.get('instructions'));
            this.model.set('recipientContactId', model.get('contactId'));
            this.model.set('recipientContactName', model.get('contactName'));
        },

        getSelectFilters: function () {
            if (this.model.get('recipientId')) {
                var nameHash = {};
                if (this.model.get('parcelType') === 'Delivery') {
                    nameHash['Delivery'] = 'Delivery';
                    return {
                        'account': {
                            type: 'equals',
                            attribute: 'accountId',
                            value: this.model.get('recipientId'),
                            data: {
                                type: 'is',
                                nameValue: this.model.get('recipientName')
                            }
                        },
                        'status': {
                            type: 'in',
                            attribute: 'status',
                            value: ['Available'],
                            data: {
                                type: 'is',
                                nameValue: 'Available'
                            }
                        },
                        'typeOfLocation': {
                            type: 'arrayAnyOf',
                            attribute: 'typeOfLocation',
                            value: ['Delivery'],
                            data: {
                                type: 'anyOf',
                                nameHash: nameHash,
                                nameValue: 'Delivery'
                            }
                        }
                    };
                } else {
                    nameHash['Pickup Point'] = 'Pickup Point';
                    return {
                        'status': {
                            type: 'in',
                            attribute: 'status',
                            value: ['Available'],
                            data: {
                                type: 'is',
                                nameValue: 'Available',
                            }
                        },
                        'typeOfLocation': {
                            type: 'arrayAnyOf',
                            attribute: 'typeOfLocation',
                            value: ['Pickup Point'],
                            data: {
                                type: 'anyOf',
                                nameHash: nameHash,
                                nameValue: 'Pickup Point'
                            }
                        }
                    };
                }
            }
        },

        getCreateAttributes: function () {
            if (this.model.get('recipientId')) {
                return {
                    accountId: this.model.get('recipientId'),
                    accountName: this.model.get('recipientName')
                }
            }
        }

    });

});