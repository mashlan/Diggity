
services.factory('UnitOfMeasure', ['$resource',
    function ($resource) {
        var resource = $resource('api/UnitOfMeasure', {},
        {
            query: { method: 'GET', isArray: true },
            get: { method: 'GET', params: { id: '@id' } },
            create: { method: 'POST' },
            update: { method: 'PUT' },
            remove: { method: 'DELETE' }
        });

        var factory = {
            query: function () {
                return resource.query({}).$promise;
            },
            get: function (id) {
                return resource.get({ id: id }).$promise;
            },
            create: function(unit) {
                return resource.create({ unit: unit }).$promise;
            },
            update: function(unit) {
                return resource.update(unit).$promise;
            },
            remove: function(id) {
                return resource.remove({ id: id }).$promise;
            }
        }

        return factory;
    }
]);