
services.factory("WendlerExercise", ['$resource',
    function ($resource) {

        var resource = $resource('api/WendlerExercise', {}, {
            query: { method: 'GET', isArray: true },
            get: { method: 'GET', params: { id: '@id' } }
        });

        var factory = {
            query: function () {
                return resource.query({}).$promise;
            },
            get: function (id) {
                return resource.get({ id: id }).$promise;
            }
        };
        return factory;
    }
]);