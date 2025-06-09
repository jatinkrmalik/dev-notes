---
layout: post
title: "AngularJS Best Practices: Building Maintainable Single Page Applications"
date: 2014-11-08 13:15:00 -0800
categories: [javascript, frontend]
tags: [angularjs, spa, mvc, directives, services, testing]
description: "Essential AngularJS patterns and practices for building scalable, maintainable single-page applications"
---

AngularJS has revolutionized how we build web applications, but with great power comes great responsibility. After building several large-scale Angular apps, I've learned that following best practices from the start can save you months of refactoring later. Here's what every Angular developer should know.

## Project Structure: Organize by Feature, Not by Type

The biggest mistake teams make is organizing by file type instead of features.

### Bad: Organizing by Type
```
app/
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   └── orderController.js
├── services/
│   ├── userService.js
│   ├── productService.js
│   └── orderService.js
├── directives/
│   ├── userDirectives.js
│   └── productDirectives.js
└── views/
    ├── user.html
    ├── product.html
    └── order.html
```

### Good: Organizing by Feature
```
app/
├── shared/
│   ├── services/
│   ├── directives/
│   └── filters/
├── users/
│   ├── users.module.js
│   ├── users.controller.js
│   ├── users.service.js
│   ├── user-profile.directive.js
│   └── users.html
├── products/
│   ├── products.module.js
│   ├── products.controller.js
│   ├── products.service.js
│   └── products.html
└── orders/
    ├── orders.module.js
    ├── orders.controller.js
    ├── orders.service.js
    └── orders.html
```

## Module Definition: One Module Per File

Keep modules focused and manageable:

```javascript
// users/users.module.js
(function() {
    'use strict';
    
    angular.module('app.users', [
        'ui.router',
        'app.shared'
    ]);
})();

// users/users.controller.js
(function() {
    'use strict';
    
    angular
        .module('app.users')
        .controller('UsersController', UsersController);
    
    UsersController.$inject = ['UserService', '$log'];
    
    function UsersController(UserService, $log) {
        var vm = this;
        
        vm.users = [];
        vm.loadUsers = loadUsers;
        vm.deleteUser = deleteUser;
        
        activate();
        
        function activate() {
            loadUsers();
        }
        
        function loadUsers() {
            UserService.getUsers()
                .then(function(users) {
                    vm.users = users;
                })
                .catch(function(error) {
                    $log.error('Failed to load users', error);
                });
        }
        
        function deleteUser(userId) {
            UserService.deleteUser(userId)
                .then(loadUsers)
                .catch(function(error) {
                    $log.error('Failed to delete user', error);
                });
        }
    }
})();
```

## Controller Best Practices

### Use `controllerAs` Syntax
```javascript
// Route configuration
.state('users', {
    url: '/users',
    templateUrl: 'users/users.html',
    controller: 'UsersController',
    controllerAs: 'vm'
})
```

```html
<!-- users.html -->
<div ng-repeat="user in vm.users">
    <h3>{{user.name}}</h3>
    <button ng-click="vm.deleteUser(user.id)">Delete</button>
</div>
```

### Keep Controllers Thin
Controllers should only handle view logic:

```javascript
// Bad: Fat controller
function UsersController($http, $log) {
    var vm = this;
    
    vm.users = [];
    vm.loadUsers = function() {
        $http.get('/api/users')
            .then(function(response) {
                // Business logic in controller (bad!)
                vm.users = response.data.filter(function(user) {
                    return user.active && user.role !== 'admin';
                });
            });
    };
}

// Good: Thin controller with service
function UsersController(UserService) {
    var vm = this;
    
    vm.users = [];
    vm.loadUsers = loadUsers;
    
    function loadUsers() {
        UserService.getActiveUsers()
            .then(function(users) {
                vm.users = users;
            });
    }
}
```

## Service Patterns: Factories vs Services

Use factories for most cases, services for constructor functions:

```javascript
// Factory pattern (most common)
angular
    .module('app.users')
    .factory('UserService', UserService);

UserService.$inject = ['$http', '$q'];

function UserService($http, $q) {
    var service = {
        getUsers: getUsers,
        getUserById: getUserById,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    
    return service;
    
    function getUsers() {
        return $http.get('/api/users')
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return $q.reject(error);
            });
    }
    
    function getUserById(id) {
        return $http.get('/api/users/' + id)
            .then(function(response) {
                return response.data;
            });
    }
    
    function createUser(user) {
        return $http.post('/api/users', user)
            .then(function(response) {
                return response.data;
            });
    }
    
    function updateUser(user) {
        return $http.put('/api/users/' + user.id, user)
            .then(function(response) {
                return response.data;
            });
    }
    
    function deleteUser(id) {
        return $http.delete('/api/users/' + id);
    }
}
```

## Directive Best Practices

### Use Isolate Scope
```javascript
angular
    .module('app.shared')
    .directive('userCard', userCard);

function userCard() {
    return {
        restrict: 'E',
        templateUrl: 'shared/directives/user-card.html',
        scope: {
            user: '=',
            onDelete: '&'
        },
        controller: UserCardController,
        controllerAs: 'vm',
        bindToController: true
    };
}

UserCardController.$inject = [];

function UserCardController() {
    var vm = this;
    
    vm.deleteUser = deleteUser;
    
    function deleteUser() {
        vm.onDelete({ userId: vm.user.id });
    }
}
```

```html
<!-- user-card.html -->
<div class="user-card">
    <h3>{{vm.user.name}}</h3>
    <p>{{vm.user.email}}</p>
    <button ng-click="vm.deleteUser()">Delete</button>
</div>
```

### Usage:
```html
<user-card 
    user="user" 
    on-delete="vm.deleteUser(userId)"
    ng-repeat="user in vm.users">
</user-card>
```

## Data Binding Performance

### One-Time Binding for Static Data
```html
<!-- Use :: for data that won't change -->
<div ng-repeat="user in vm.users">
    <h3>{{::user.name}}</h3>
    <p>{{::user.email}}</p>
    <span>{{user.lastLogin}}</span> <!-- This might change -->
</div>
```

### Track By in ng-repeat
```html
<!-- Improves performance for large lists -->
<div ng-repeat="user in vm.users track by user.id">
    <h3>{{user.name}}</h3>
</div>
```

### Limit Watchers
```javascript
// Bad: Too many watchers
$scope.expensiveCalculation = function() {
    return someHeavyComputation($scope.data);
};

// Good: Cache the result
$scope.result = null;
$scope.$watch('data', function(newData) {
    if (newData) {
        $scope.result = someHeavyComputation(newData);
    }
});
```

## Error Handling Patterns

### Global Error Handler
```javascript
angular
    .module('app')
    .config(exceptionConfig);

exceptionConfig.$inject = ['$provide'];

function exceptionConfig($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

extendExceptionHandler.$inject = ['$delegate', '$log'];

function extendExceptionHandler($delegate, $log) {
    return function(exception, cause) {
        $delegate(exception, cause);
        
        // Send to logging service
        var errorData = {
            exception: exception,
            cause: cause,
            timestamp: new Date(),
            url: window.location.href
        };
        
        // LoggingService.logError(errorData);
        $log.error('Exception', errorData);
    };
}
```

### HTTP Interceptors
```javascript
angular
    .module('app')
    .factory('httpInterceptor', httpInterceptor);

httpInterceptor.$inject = ['$q', '$log'];

function httpInterceptor($q, $log) {
    return {
        request: function(config) {
            // Add auth token
            config.headers = config.headers || {};
            config.headers.Authorization = 'Bearer ' + getToken();
            return config;
        },
        
        responseError: function(rejection) {
            if (rejection.status === 401) {
                // Redirect to login
                $location.path('/login');
            } else if (rejection.status === 500) {
                // Show error message
                NotificationService.error('Server error occurred');
            }
            
            $log.error('HTTP Error', rejection);
            return $q.reject(rejection);
        }
    };
}

// Register interceptor
angular
    .module('app')
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
```

## Testing Strategies

### Unit Testing Controllers
```javascript
describe('UsersController', function() {
    var controller, UserService, $q, $rootScope;
    
    beforeEach(module('app.users'));
    
    beforeEach(inject(function($controller, _UserService_, _$q_, _$rootScope_) {
        UserService = _UserService_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        
        spyOn(UserService, 'getUsers').and.returnValue($q.when([
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' }
        ]));
        
        controller = $controller('UsersController');
    }));
    
    it('should load users on activation', function() {
        expect(UserService.getUsers).toHaveBeenCalled();
        
        $rootScope.$apply(); // Trigger promise resolution
        
        expect(controller.users.length).toBe(2);
        expect(controller.users[0].name).toBe('John');
    });
});
```

### Testing Services
```javascript
describe('UserService', function() {
    var UserService, $httpBackend;
    
    beforeEach(module('app.users'));
    
    beforeEach(inject(function(_UserService_, _$httpBackend_) {
        UserService = _UserService_;
        $httpBackend = _$httpBackend_;
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should get users from API', function() {
        var users = [{ id: 1, name: 'John' }];
        $httpBackend.expectGET('/api/users').respond(200, users);
        
        var result;
        UserService.getUsers().then(function(data) {
            result = data;
        });
        
        $httpBackend.flush();
        
        expect(result).toEqual(users);
    });
});
```

## Routing with UI-Router

### State Configuration
```javascript
angular
    .module('app')
    .config(routeConfig);

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .state('users', {
            url: '/users',
            templateUrl: 'users/users.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            resolve: {
                users: ['UserService', function(UserService) {
                    return UserService.getUsers();
                }]
            }
        })
        .state('users.detail', {
            url: '/{id:int}',
            templateUrl: 'users/user-detail.html',
            controller: 'UserDetailController',
            controllerAs: 'vm',
            resolve: {
                user: ['UserService', '$stateParams', function(UserService, $stateParams) {
                    return UserService.getUserById($stateParams.id);
                }]
            }
        });
}
```

### Using Resolves
```javascript
// Inject resolved data into controller
function UsersController(users) { // 'users' from resolve
    var vm = this;
    vm.users = users; // Data already loaded
}

function UserDetailController(user) { // 'user' from resolve
    var vm = this;
    vm.user = user; // Individual user already loaded
}
```

## Form Validation Patterns

### Custom Validation Directive
```javascript
angular
    .module('app.shared')
    .directive('uniqueEmail', uniqueEmail);

uniqueEmail.$inject = ['UserService', '$q'];

function uniqueEmail(UserService, $q) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$asyncValidators.uniqueEmail = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return $q.when();
                }
                
                return UserService.checkEmailExists(modelValue)
                    .then(function(exists) {
                        if (exists) {
                            return $q.reject();
                        }
                        return true;
                    });
            };
        }
    };
}
```

### Form Controller
```javascript
function UserFormController(UserService, $state) {
    var vm = this;
    
    vm.user = {};
    vm.userForm = null; // Will be set by form
    vm.saveUser = saveUser;
    vm.isFormValid = isFormValid;
    
    function saveUser() {
        if (isFormValid()) {
            UserService.createUser(vm.user)
                .then(function() {
                    $state.go('users');
                })
                .catch(function(error) {
                    // Handle error
                });
        }
    }
    
    function isFormValid() {
        return vm.userForm && vm.userForm.$valid;
    }
}
```

```html
<!-- user-form.html -->
<form name="vm.userForm" ng-submit="vm.saveUser()" novalidate>
    <div class="form-group">
        <label>Name</label>
        <input type="text" 
               name="name"
               ng-model="vm.user.name" 
               required 
               class="form-control">
        <div ng-show="vm.userForm.name.$invalid && vm.userForm.name.$touched">
            <span ng-show="vm.userForm.name.$error.required">Name is required</span>
        </div>
    </div>
    
    <div class="form-group">
        <label>Email</label>
        <input type="email" 
               name="email"
               ng-model="vm.user.email" 
               required 
               unique-email
               class="form-control">
        <div ng-show="vm.userForm.email.$invalid && vm.userForm.email.$touched">
            <span ng-show="vm.userForm.email.$error.required">Email is required</span>
            <span ng-show="vm.userForm.email.$error.email">Invalid email format</span>
            <span ng-show="vm.userForm.email.$error.uniqueEmail">Email already exists</span>
        </div>
    </div>
    
    <button type="submit" ng-disabled="!vm.isFormValid()">Save User</button>
</form>
```

## Performance Optimization

### Disable Debug Info in Production
```javascript
angular
    .module('app')
    .config(debugConfig);

debugConfig.$inject = ['$compileProvider'];

function debugConfig($compileProvider) {
    // Disable debug info in production
    $compileProvider.debugInfoEnabled(false);
}
```

### Use ng-if Instead of ng-show for Heavy Content
```html
<!-- ng-show: DOM elements always created -->
<div ng-show="vm.showExpensiveContent">
    <expensive-directive></expensive-directive>
</div>

<!-- ng-if: DOM elements created only when needed -->
<div ng-if="vm.showExpensiveContent">
    <expensive-directive></expensive-directive>
</div>
```

### Pagination for Large Datasets
```javascript
function UsersController(UserService) {
    var vm = this;
    
    vm.users = [];
    vm.currentPage = 1;
    vm.pageSize = 20;
    vm.totalUsers = 0;
    vm.loadPage = loadPage;
    
    activate();
    
    function activate() {
        loadPage(1);
    }
    
    function loadPage(page) {
        UserService.getUsers(page, vm.pageSize)
            .then(function(response) {
                vm.users = response.users;
                vm.totalUsers = response.total;
                vm.currentPage = page;
            });
    }
}
```

## Security Best Practices

### Sanitize User Input
```javascript
angular
    .module('app')
    .config(sceConfig);

sceConfig.$inject = ['$sceDelegateProvider'];

function sceConfig($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://trusted-api.example.com/**'
    ]);
}
```

### Use Strict Contextual Escaping
```html
<!-- Safe: Angular escapes by default -->
<div>{{user.name}}</div>

<!-- Dangerous: Raw HTML -->
<div ng-bind-html="user.bio"></div>

<!-- Safe: Sanitized HTML -->
<div ng-bind-html="user.bio | sanitize"></div>
```

## Build Process with Grunt/Gulp

### Gruntfile.js Example
```javascript
module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: [
                    'app/**/*.module.js',
                    'app/**/*.js'
                ],
                dest: 'dist/app.js'
            }
        },
        
        uglify: {
            dist: {
                files: {
                    'dist/app.min.js': ['dist/app.js']
                }
            }
        },
        
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    
    grunt.registerTask('default', ['karma', 'concat', 'uglify']);
};
```

## Conclusion

AngularJS provides a powerful framework for building SPAs, but following these best practices is crucial for maintainable applications:

1. **Organize by feature**, not file type
2. **Keep controllers thin** and use services for business logic
3. **Use proper dependency injection** with explicit annotations
4. **Write testable code** with isolated components
5. **Optimize performance** with one-time binding and smart watchers
6. **Handle errors gracefully** with interceptors and global handlers

The Angular ecosystem is evolving rapidly with Angular 2.0 on the horizon, but these patterns will serve you well for building robust applications today.

**Remember: Good architecture early saves refactoring later.** 