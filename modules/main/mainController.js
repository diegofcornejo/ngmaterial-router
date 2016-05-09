app.controller('mainController', function($scope, $rootScope, $state, $mdSidenav, $interval, $timeout, dialog, api, localStorage, login) {

    if (localStorage.check('session')) {
        $rootScope.user = localStorage.get('session').user;
    } else {
        $timeout(function() {
            $state.go('login');
        });
    };

    $rootScope.JSON = JSON;

    $scope.menuItems = [{
        icon: 'ion-ios-star',
        title: 'Mis clientes',
        view: 'main.customers'
    }, {
        icon: 'ion-ios-people',
        title: 'Mis partners',
        view: 'main.partners'
    }, {
        icon: 'ion-person',
        title: 'Mis agentes',
        view: 'main.agents'
    }, {
        icon: 'ion-edit',
        title: 'Gestión de perfiles',
        view: 'main.profiles'
    }, {
        icon: 'ion-help',
        title: 'Soporte',
        view: 'main.tickets'
    }];

    $scope.views = [{
        view: 'main.customers',
        title: 'Clientes',
        icon: 'ion-ios-star'
    }, {
        view: 'main.customer',
        title: 'Cliente',
        icon: 'ion-ios-star'
    }, {
        view: 'main.agents',
        title: 'Agentes',
        icon: 'ion-person'
    }, {
        view: 'main.agent',
        title: 'Agente',
        icon: 'ion-person'
    }, {
        view: 'main.partners',
        title: 'Partners',
        icon: 'ion-ios-people'
    }, {
        view: 'main.partner',
        title: 'Partner',
        icon: 'ion-ios-people'
    }, {
        view: 'main.profiles',
        title: 'Perfiles',
        icon: 'ion-edit'
    }, {
        view: 'main.profile',
        title: 'Perfil',
        icon: 'ion-edit'
    }, {
        view: 'main.tickets',
        title: 'Soporte',
        icon: 'ion-help'
    }, {
        view: 'main.ticket',
        title: 'Soporte',
        icon: 'ion-help'
    }]

    $scope.creator = function() {
        switch ($state.current.name) {
            case 'main.customers':

                break;
            case 'main.partners':

                break;
            case 'main.agents':

                break;
            case 'main.profiles':

                break;
            default:
                console.log('other');
        }
    }

    // Get view data
    $rootScope.title = function() {
        $timeout(function() {
            for (i = 0; i < $scope.views.length; i++) {
                if ($scope.views[i].view == $state.current.name) {
                    $rootScope.view = $scope.views[i];
                }
            }
        })
    }

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.title();
    });

    $rootScope.title();

    $scope.goView = function(view) {
        $state.go(view.view);
    }

    $scope.logout = login.logout;

    $rootScope.$state = $state;
    $rootScope.core = {};

    api.partner.getOne({
        id: $rootScope.user.partner,
        params: 'name&pricing',
        success: function(data) {
            $rootScope.partnerName = data.name;
            $rootScope.partnerPricing = data.pricing;
            if($rootScope.partnerPricing){
               $rootScope.partnerPricing = JSON.parse($rootScope.partnerPricing);
            }
        }
    })
    if ($rootScope.user.profile != null) {
        api.profile.getOne({
            id: $rootScope.user.profile,
            success: function(data) {
                $rootScope.profile = data.model;
            },
            error: function(error) {
                alert(error)
            }
        })
    } else {
        $rootScope.profile = {
            products: {
                _1: true,
                _3: true,
                _4: true,
                _8: true,
                _9: true,
                _2: true
            },
            customers: {
                module: true,
                products: true,
                users: true,
                payments: true
            },
            partners: {
                module: true,
                payments: true
            },
            agents: {
                module: true
            },
            profiles: {
                module: false,
                partners: true,
                agents: true,
                customers: true
            }
        }
        //para pentcloud
        if ($rootScope.user.id == 1) {
            $rootScope.profile.profiles.module = true;
        }
    }

});