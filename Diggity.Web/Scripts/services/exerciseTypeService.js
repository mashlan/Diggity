

services.factory("ExerciseType", [
    '$resource', '$q',
    function($resource, $q) {
        var resource = $resource('api/ExerciseType', {}, {
            query: { method: 'GET', params: {}, isArray: true },
            get: { method: 'GET', params: { id: 0 } }
        });

        var factory = {
            query: function() {
                var deferred = $q.defer();
                resource.query({},
                    function(resp) { deferred.resolve(resp); },
                    function(error) { deferred.reject(error); }
                );

                return deferred.promise;
            },
            get: function(id) {
                var deferred = $q.defer();
                resource.get({ id: id },
                    function(resp) {
                        deferred.resolve(resp);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            }
        };

        return factory;
    }
]);