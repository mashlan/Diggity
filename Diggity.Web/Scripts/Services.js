
services.factory("ExerciseType", ['$resource', '$q',
    function ($resource, $q) {
        var resource = $resource('exerciseType/:exTypeId/:id/', {}, {
            query: { method: 'GET', params: { exTypeId: 'all', id: null, sortName: null }, isArray: true },
            get: { method: 'GET', params: { id: 0 } }
        });

        var factory = {
            query: function (sortByName, sortDir) {
                var deferred = $q.defer();
                resource.query({ exTypeId: 'all', sortName: sortByName, sortDirection: sortDir },
                    function (resp) { deferred.resolve(resp); },
                    function (error) { deferred.reject(error); }
                );

                return deferred.promise;
            },
            get: function (id) {
                var deferred = $q.defer();
                resource.get({ id: id },
                    function (resp) {
                        deferred.resolve(resp);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            }
        };

        return factory;
    }
]);