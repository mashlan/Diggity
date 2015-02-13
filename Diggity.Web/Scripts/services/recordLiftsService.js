
services.factory("MaxLifts", ['$resource',
    function ($resource) {

        var resource = $resource('api/MaxLifts', {}, {
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
            create: function (data) {
                return resource.create(data).$promise;
            },
            update: function (data) {
                return resource.update(data).$promise;
            },
            remove: function (id) {
                return resource.remove({ id: id }).$promise;
            }
        };
        return factory;
    }
]);