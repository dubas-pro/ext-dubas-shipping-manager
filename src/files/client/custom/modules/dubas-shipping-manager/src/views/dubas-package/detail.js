Espo.define('dubas-shipping-manager:views/dubas-package/detail', 'views/detail', function (Dep) {

    return Dep.extend({

        setup: function () {
            Dep.prototype.setup.call(this);

            this.addMenuItem('buttons', {
                name: 'changeStatus',
                label: 'Change status',
                action: 'changeStatus',
                acl: 'edit',
                style: 'primary'
            }, true);
        },

        afterRender: function () {
            Dep.prototype.afterRender.call(this);
        },

        actionChangeStatus: function () {
            var attributes = {};
            var packageNames = {};

            packageNames[this.model.get('id')] = this.model.get('name');
            attributes.packagesIds = [this.model.get('id')];
            attributes.packagesNames = packageNames;

            var viewName = this.getMetadata().get('clientDefs.DubasPackageStatus.modalViews.edit') || 'views/modals/edit';

            this.notify('Loading...');
            this.createView('quickCreate', viewName, {
                scope: 'DubasPackageStatus',
                attributes: attributes,
            }, function (view) {
                view.render();
                view.notify(false);
                view.once('after:save', function () {
                    view.close();
                    this.notify('Status changed', 'success');
                }.bind(this));
            }.bind(this));
        }

    });
});
