appCtrl.controller('atomQueryCtrl', ['$rootScope', '$scope', 'riskService', '$timeout', function($rootScope, $scope, $riskService, $timeout) {
	$rootScope.currentRountName = 'atomQuery';
	$scope.infoData = {
		count: -1,
		permissionsUN: [],
		permissions: [],
		queryData: {
			s: $riskService.size,
			order: "desc",
			column: "update_time"
		},
		inputFields: {
			vm: {}
		},
		apiUrl: $riskService.risk.url,
		column: {
			name: "update_time",
			sort: true
		}
	};

	$scope.infoData.query = function(pageGo) {
		$riskService.query(pageGo, $scope);
	};

	$scope.infoData.detail = function(id) {
		$scope.infoData.detailApi(id, function(status, data, xhr) {
			$("#detailModal").modal("show");
			$scope.infoData.detailResult = data.data.value.data;
			$scope.$apply();
		});
	};

	$scope.infoData.showModal = function() {
		if($scope.infoData.fieldsData === undefined || $scope.infoData.fieldsData === null) {
			$scope.infoData.getFieldsApi(function(status, data, xhr) {
				$scope.infoData.fieldsData = data.data.value;
				$scope.infoData.permissions = $.deepCopy($scope.infoData.permissions, $scope.infoData.fieldsData.mainFieldList);
				$scope.infoData.reset();
				$scope.$apply();
				$("#newModal").modal("show");
			});
		} else {
			$scope.infoData.reset();
			$scope.infoData.permissions = [];
			$scope.infoData.permissionsUN = [];
			$scope.infoData.permissions = $.deepCopy($scope.infoData.permissions, $scope.infoData.fieldsData.mainFieldList);
			$("#newModal").modal("show");
		}
	};

	$scope.infoData.getMainFieldList = function() {
		var value = [];
		var sysScene = [];
		var fields = $scope.infoData.inputFields;
		var models = $scope.infoData.fieldsData.pageConfModels;
		$scope.infoData.inputFields.sysScene = "";
		for(var k = $scope.infoData.permissionsUN.length - 1; k >= 0; k--) {
			value.push($scope.infoData.permissionsUN[k].fieldName);
		}
		$scope.infoData.inputFields.mainFieldNames = value.join(";");
		for(var i = models.length - 1; i >= 0; i--) {
			if(models[i].parentValue == $scope.infoData.inputFields.sysBusiness) {
				var model = models[i].models;
				for(var j = model.length - 1; j >= 0; i--) {
					var subType = model[j].subType;
					sysScene.push(subType + ":" + fields[subType]);
				}
				$scope.infoData.inputFields.sysScene = sysScene.join(";");
				break;
			}
		}
	};

	$scope.infoData.addAtom = function() {
		if($scope.infoData.checkTimeValue() === false) {
			$rootScope.mask = {
				title: "提示",
				body: "时间格式有误！",
				ok: function() {
					$rootScope.mask.show = false;
				},
				show: true
			};
			return;
		}
		$scope.infoData.getMainFieldList();
		$scope.infoData.addAtomApi($scope.infoData.inputFields, function(status, data, xhr) {
			$scope.infoData.query(null);
			$rootScope.mask = {
				title: "提示",
				body: "成功添加原子",
				ok: function() {
					$rootScope.mask.show = false;
					$("#newModal").modal("hide");
				},
				show: true
			};
			$rootScope.$digest();
		});
	};
	$scope.infoData.checkTimeValue = function() {
		var flag = false;
		var timeValue = $scope.infoData.inputFields.timeValue;
		if(timeValue.indexOf("-") > 0 && timeValue.length > 2) {
			var arr = timeValue.split("-");
			if(arr.length == 2) {
				var reg = /^\d+$/;
				var beginTime = arr[0];
				var endTime = arr[1];
				if(reg.test(arr[0]) && reg.test(arr[1])) {
					if(Number(arr[1]) >= Number(arr[0]) && Number(arr[1]) <= 100 && Number(arr[0]) === 0) {
						flag = true;
					}
				}
			}
		}
		return flag;
	};

	//查询数据
	$scope.infoData.queryApi = function(data, callback) {
		$riskService.postAjax($scope.infoData.apiUrl + "/atom/list", data, callback);
	};

	// 新增原子
	$scope.infoData.addAtomApi = function(data, callback) {
		$riskService.postAjax($scope.infoData.apiUrl + "/atom/addAtom", data, callback);
	};

	//新增统计原子页面字段数据 sysNo vpal
	$scope.infoData.getFieldsApi = function(callback) {
		$riskService.getAjax($scope.infoData.apiUrl + "/atom/toAddPage?sysNo=vpal", "", callback);
	};

	//原子详情
	$scope.infoData.detailApi = function(data, callback) {
		$riskService.getAjax($scope.infoData.apiUrl + "/atom/atomDetail", "?id=" + data, callback);
	};

	//查询下拉框字段 
	$scope.infoData.dictApi = function(callback) {
		$riskService.getAjax($scope.infoData.apiUrl + "/common/dict/subs/", "dcPushStatus,enabled,sysBusiness", callback);
	};

	$scope.infoData.switchResult = function(queryParameter) {
		if(!queryParameter.count) {
			return;
		}
		var results = queryParameter.results;
		for(var i = results.length - 1; i >= 0; i--) {
			var current = results[i];
			if(current.status !== null && current.status !== undefined) {
				switch(current.status) {
					case 1:
						current.status = "有效";
						break;
					case 0:
						current.status = "无效";
						break;
					default:
						current.status = "";
				}
			}
			if(current.dcPushStatus !== null && current.dcPushStatus !== undefined) {
				switch(current.dcPushStatus) {
					case 1:
						current.dcPushStatus = "false";
						break;
					case 2:
						current.dcPushStatus = "true";
						break;
					default:
						current.dcPushStatus = "false";
				}
			}

			if(current.enabled !== null && current.enabled !== undefined) {
				switch(current.enabled) {
					case 1:
						current.enabled = "false";
						break;
					case 2:
						current.enabled = "true";
						break;
					default:
						current.enabled = "false";
				}
			}
		}
		return results;
	};

	$scope.infoData.reset = function() {
		var models = $scope.infoData.fieldsData.pageConfModels;
		var fields = $scope.infoData.inputFields;
		var timeFieldList = $scope.infoData.fieldsData.timeFieldList;
		var statisticsFieldList = $scope.infoData.fieldsData.statisticsFieldList;
		fields.description = "";
		fields.timeType = "1";
		fields.timeFieldName = timeFieldList.length > 0 ? timeFieldList[0].fieldName : "";
		fields.timeValue = "";
		fields.timeUnit = "1";
		fields.statisticsModifier = "1";
		fields.statisticsFieldName = statisticsFieldList.length > 0 ? statisticsFieldList[0].fieldName : "";
		fields.statisticsType = "0";
		if(models.length > 0) {
			var currentModels = models[0];
			fields[currentModels.parentType] = currentModels.parentValue;
			for(var i = currentModels.models.length - 1; i >= 0; i--) {
				var model = currentModels.models[i];
				if(model.isIncludeNoLimit == "Y") {
					fields[model.subType] = model.subList[0].value;
				} else {
					fields[model.subType] = "-1";
				}
			}
		}
	};

	$scope.infoData.resetDict = function() {
		$scope.infoData.queryData.name = "";
		$scope.infoData.queryData.dcPushStatus = "";
		$scope.infoData.queryData.enabled = "";
		$scope.infoData.queryData.sysBusiness = "";
	};

	$scope.infoData.query(null);
	$scope.infoData.dictApi(function(status, data, xhr) {
		$scope.infoData.dict = data.data.value;
		$scope.$apply();
	});
}]);