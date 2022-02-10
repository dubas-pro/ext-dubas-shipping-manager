Espo.define('dubas-shipping-manager:views/dubas-parcel/fields/pickup-location', 'views/fields/link', function (Dep) {

    return Dep.extend({

        forceSelectAllAttributes: true,

        select: function (model) {
            Dep.prototype.select.call(this, model);

            this.model.set('pickupAddressStreet', model.get('addressStreet'));
            this.model.set('pickupAddressCity', model.get('addressCity'));
            this.model.set('pickupAddressState', model.get('addressState'));
            this.model.set('pickupAddressCountry', model.get('addressCountry'));
            this.model.set('pickupAddressPostalCode', model.get('addressPostalCode'));

            this.model.set('pickupInstructions', model.get('instructions'));
            this.model.set('senderContactId', model.get('contactId'));
            this.model.set('senderContactName', model.get('contactName'));
        },

        getSelectFilters: function () {
            if (this.model.get('senderId')) {
                return {
                    'account': {
                        type: 'equals',
                        attribute: 'accountId',
                        value: this.model.get('senderId'),
                        data: {
                            type: 'is',
                            nameValue: this.model.get('senderName')
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
                        value: ['Pickup'],
                        data: {
                            type: 'anyOf',
                            nameValue: ['Pickup']
                        }
                    }
                };
            }
        },

        getCreateAttributes: function () {
            if (this.model.get('senderId')) {
                return {
                    accountId: this.model.get('senderId'),
                    accountName: this.model.get('senderName')
                }
            }
        }

    });

});