// Define the AngularJS app
var app = angular.module('registrationApp', []);

// Custom filter to format phone number
app.filter('formatPhone', function() {
    return function(phoneNumber) {
        if (!phoneNumber) return '';
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    };
});

// Define the registration service to interact with API
app.service('registrationService', function($http) {
    const apiUrl = 'http://localhost:5000/api/registrations';

    this.submitRegistration = function(registration) {
        return $http.post(apiUrl, registration);
    };

    this.getRegistrations = function() {
        return $http.get(apiUrl);
    };
});

// Define the factory for registration operations
app.factory('registrationFactory', function($http) {
    const apiUrl = 'http://localhost:5000/api/registrations';

    return {
        addRegistration: function(registration) {
            return $http.post(apiUrl, registration);
        },
        getAllRegistrations: function() {
            return $http.get(apiUrl);
        }
    };
});

// Define the controller for handling form submission
app.controller('RegistrationController', function($scope, registrationService, registrationFactory) {
    $scope.registration = {};
    $scope.message = '';
    $scope.registrations = [];

    // Fetch all registrations initially
    registrationFactory.getAllRegistrations().then(function(response) {
        $scope.registrations = response.data;
    });

    // Submit registration form
    $scope.submitForm = function() {
        registrationFactory.addRegistration($scope.registration)
            .then(function(response) {
                $scope.message = 'Registration successful!';
                $scope.registrations.push(response.data); // Add new registration to list
                $scope.registration = {}; // Clear form
            })
            .catch(function(error) {
                $scope.message = 'Error: Registration failed.';
            });
    };
});

// Custom directive for form validation (for additional validation)
app.directive('validEmail', function() {
    var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$validators.validEmail = function(modelValue) {
                return EMAIL_REGEX.test(modelValue);
            };
        }
    };
});
