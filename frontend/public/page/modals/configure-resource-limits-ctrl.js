angular.module('bridge.page')
.controller('ConfigureResourceLimitsCtrl', function($scope, $uibModalInstance, _, k8s, pkg, container) {
  'use strict';

  $scope.fields = k8s.docker.getEmptyResourceLimits();

  $scope.resourceLimitRegex = k8s.enum.ResourceLimitRegex;

  if (container.resources && !_.isEmpty(container.resources.limits)) {
    _.extend($scope.fields.limits, container.resources.limits);
  }

  $scope.save = function() {
    if (pkg.allEmpty($scope.fields.limits)) {
      container.resources = null;
    } else {
      if (!container.resources) {
        container.resources = {};
      }
      container.resources.limits = $scope.fields.limits;
    }
    $uibModalInstance.close(container);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

})
.controller('ConfigureResourceLimitsFormCtrl', function($scope) {
  'use strict';
  $scope.submit = $scope.save;
});
