(function() {
    'use strict';

    angular
        .module('assessoriaTorrellesApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', '$state', 'Contact', 'Company', 'AlertService'];

    function ContactController ($scope, $state, Contact, Company, AlertService) {

        var vm = this;

        vm.contacts = [];
        vm.companies = [];

        vm.companyInfo = {
            "name": "",
            "phone": "",
            "email": "",
            "cif": "",
            "lat": "",
            "long": ""
        };

        vm.formData = {};

        loadAll();

        function loadAll() {
            Contact.query(function(result) {
                vm.contacts = result;
            });
            Company.query(function (result) {
                vm.companies = result;
            });
        }

        vm.sendEmail = function() {
            Contact.sendMail({
                "to": vm.companies.email,
                "subject": vm.formData.subject,
                "content": vm.formData.name + " (" + vm.formData.mail + ") says...  " + vm.formData.message
            },{},onSuccess,onError);
            function onSuccess() {
                toastr.success("Email enviado con éxito!");
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
            //We finally clean the fields
            vm.formData = {};
        }

    }
})();
