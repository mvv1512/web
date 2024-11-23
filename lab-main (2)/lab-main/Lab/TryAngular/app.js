// Define the AngularJS app module
var app = angular.module('registrationApp', []);

// Custom filter to format phone numbers
app.filter('formatPhone', function() {
    return function(phone) {
        if (!phone) return '--'; // Handle missing or invalid phone numbers
        // Format phone numbers (assuming a specific format or length)
        return phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6);
    };
});

// Define a service to handle registration data
app.service('registrationService', function($http) {
    const apiUrl = 'http://localhost:5000/api/registrations';

    // Fetch all registrations
    this.getAllRegistrations = function() {
        return $http.get(apiUrl);
    };

    // Submit a new registration
    this.submitRegistration = function(registration) {
        return $http.post(apiUrl, registration);
    };
});

// Define a factory for handling registration-related logic
app.factory('registrationFactory', function($http, registrationService) {
    return {
        getAllRegistrations: function() {
            return registrationService.getAllRegistrations();
        },
        submitRegistration: function(registration) {
            return registrationService.submitRegistration(registration);
        }
    };
});

// Define the main controller for registration handling
app.controller('RegistrationController', function($scope, registrationFactory) {
    $scope.registration = {};
    $scope.registrations = [];
    $scope.message = '';

    // Fetch existing registrations from the server
    registrationFactory.getAllRegistrations().then(function(response) {
        $scope.registrations = response.data; // Assign data to scope
    }).catch(function(error) {
        $scope.message = 'Error fetching registrations: ' + error;
    });

    // Submit a new registration
    $scope.submitForm = function() {
        registrationFactory.submitRegistration($scope.registration).then(function(response) {
            $scope.message = 'Registration successful!';
            $scope.registrations.push(response.data); // Add new registration to the list
            $scope.registration = {}; // Clear the form after submission
        }).catch(function(error) {
            $scope.message = 'Error: Registration failed.';
        });
    };
});
