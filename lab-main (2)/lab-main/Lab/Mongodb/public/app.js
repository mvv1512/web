var app = angular.module('registrationApp', []);

app.controller('RegistrationController', function($scope, $http) {
    $scope.registration = {};
    $scope.message = '';

    $scope.submitForm = function() {
        $http.post('http://localhost:5000/api/registrations', $scope.registration)
            .then(function(response) {
                $scope.message = 'Registration successful!';
                $scope.registration = {}; // Clear form
            })
            .catch(function(error) {
                $scope.message = 'Error: Registration failed.';
            });
    };
});
