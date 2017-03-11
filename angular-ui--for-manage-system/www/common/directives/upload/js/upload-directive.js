
/**
* 上传组件封装
* @author yuan10.li 2016年8月31日
*  
* 示例：<div beifu-upload api-url="infoData.API.batchUploadApi" form-data="infoData.formData"/>
* @param apiUrl:服务端url
* @param formData：表单数据	
* 例如 formData:[ {
*			confId : 123,
*			merchantId:"123456"
*		} ]
*/
appDirect
		.directive(
				'beifuUpload',
				function() {
					return {
						restrict : 'EAC',
						replace : true,
						scope : {
							apiUrl : "=",
							formData:"="
						},
						templateUrl : "common/directives/upload/template/upload.html",
						transclude : true,

						controller : [
								'$rootScope',
								'$scope',
								'$element',
								'$attrs',
								"FileUploader",
								function($rootScope, $scope, $element, $attrs,
										FileUploader) {
									var uploader = $scope.uploader = new FileUploader(
											{
												url : $scope.apiUrl,
												queueLimit : 1
											});
									$scope.uploadFile = function() {
										if (uploader === undefined|| uploader.queue.length === 0) {
											$scope.fileCheck = "请选择要上传的文件......";
											return;
										}
										$scope.isUploading = false;
										$scope.fileCheck = "上传中，请稍等......";
										uploader.uploadAll();
									};

									$scope.clearItems = function() {
										$scope.isUploading = false;
										$scope.fileCheck = "";
										if (uploader !== undefined&& uploader.queue.length !== 0) {
											uploader.queue[0].progress = 0;
											uploader.clearQueue();
										}
									};
									uploader.onBeforeUploadItem = function(item) {
										 item.formData =$scope.formData;
									};
									uploader.onSuccessItem = function(fileItem,
											response, status, headers) {
										$scope.fileCheck = response.data.value;

										$scope.isUploading = true;
									};

									uploader.onWhenAddingFileFailed = function(
											item, filter, options) {
									};
									uploader.onAfterAddingFile = function(
											fileItem) {
									};
									uploader.onAfterAddingAll = function(
											addedFileItems) {

									};
									uploader.onProgressAll = function(progress) {
									};
									uploader.onErrorItem = function(fileItem,
											response, status, headers) {
									};
									uploader.onCancelItem = function(fileItem,
											response, status, headers) {
									};
									uploader.onCompleteItem = function(
											fileItem, response, status, headers) {
									};
									uploader.onCompleteAll = function() {
									};
								} ],
						compile : function(tElem, tAttrs) {

						}
					};
				});