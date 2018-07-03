

angular.module('app.controllers', [])
  
.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('chatsCtrl', ['$scope','$http', '$stateParams','$interval', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope,$http, $stateParams,$interval) {

// alert(location.href);
var flag=true;
 $interval(function(){
    // debugger;
// alert("inside fun");
if(location.href.split("#")[1]=="/page1/page2" && flag){
    flag=false;
 $http({
                url: "http://localhost:3000/listNames",
                method: "GET",
               
            }).then(function(res) {
                //alert("inside fun");
                $scope.obj=[];
                res.data.forEach(function(val){
                    if(val._id!=localStorage.getItem('wpChatId'))
                    {
                            $scope.obj.push(val);
                    }

                })

                


            }
            );
}
if(location.href.split("#")[1]!="/page1/page2" && flag!=true){
    flag=true;
}
 },5000);
    $http({
                url: "http://localhost:3000/listNames",
                method: "GET",
               
            }).then(function(res) {
                
                $scope.obj=[];
                res.data.forEach(function(val){
                    if(val._id!=localStorage.getItem('wpChatId'))
                    {
                            $scope.obj.push(val);
                    }

                })
            }
            );



}])
   
.controller('contactsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('loginCtrl', ['$scope','$state','$http', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
                          
              
function ($scope,$state,$http, $stateParams) {
    if(localStorage.getItem("wpChatId")==null){
        localStorage.setItem("wpChatId",-1)
    }
    if(localStorage.getItem("wpChatId").length>5){
        $state.go("tabsController.chatExpanded");
    }
  
    $scope.login=function(email){
        alert(email);

$http({
                url: "http://localhost:3000/secondVerifyOTP",
                method: "GET",
                params: {
                    
                    email: email
                    
                }
            }).then(function(res) {
                console.log(res.data);
                if(res.data.id==0){
                    console.log("Find that id =0");
                    alert("You  are not yet signed in");
                    
                }
                else{
                       
                       $state.go("verifyOTP",{email:email});
                }
                // if (res.data.id) { // localStorage.setItem("wpChatId", res.data.id); // $scope.userAuthentication = true; // } else { // localStorage.setItem("wpChatId", -1); // $scope.userAuthentication = false; // }
            });



//         $http({
//                 url: "http://localhost:3000/secondVerifyOTP",
//                 method: "GET",
//                 params: {
                   
//                     email: email
                    
//                 }
//             }).then(function(res) {
//                 console.log("hiiiiiii");
//                 if(res.data.id==0){
//                     alert("already exist")
//                 }
//                 else{
//                     $state.go("verifyOTP",{email:res.data.id});
//                 }
//                 // if (res.data.id) { // localStorage.setItem("wpChatId", res.data.id); // $scope.userAuthentication = true; // } else { // localStorage.setItem("wpChatId", -1); // $scope.userAuthentication = false; // }
            
//         //alert("Inside");
// //        debugger;
//         console.log($scope.email);
// $state.go("verifyOTP",{email:email}); 
// })   



}


}])
   
.controller('signupCtrl', ['$scope','$http','$state', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$http, $state,$stateParams) {
 $scope.createAccount = function(name, email, phone, callback) {
    
    localStorage.setItem("wpname",name);
            $http({
                url: "http://localhost:3000/createAccount",
                method: "GET",
                params: {
                    name: name,
                    email: email,
                    phone: phone
                }
            }).then(function(res) {
                console.log(res.data);
                if(res.data.id==0){
                    alert("already exist")
                }
                else{
                    $state.go("verifyOTP",{email:res.data.id});
                }
                // if (res.data.id) { // localStorage.setItem("wpChatId", res.data.id); // $scope.userAuthentication = true; // } else { // localStorage.setItem("wpChatId", -1); // $scope.userAuthentication = false; // }
            });
        }

}])
   
.controller('contactExpandedCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {




}])
   
// .controller('chatExpandedCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams) {


// }])
.controller('chatExpandedCtrl', function ($scope,$timeout, $state, $stateParams, $ionicScrollDelegate) {
      
      var socket = io.connect('http://localhost:3000');

        $scope.$on('$viewContentLoaded', function () {
            //call it here
                       // alert("loaded");
            $ionicScrollDelegate.scrollBottom();
            //            navigator.device.capture.captureAudio(
            //        captureSuccess,captureError,{duration:10});
            //}
            //            console.log(navigator.device.capture)
        });
        socket.on('newMsg',function(data){




            alert("Msg got");
        })

        
            $scope.msg = [{
                msg: "hello",
                status: "sent",
            }];

            var messageSequenceId = 0;
            var messageArray = [];


            function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}//Convert 24 hour time to 12 hour time


            $scope.send = function(msg) {
                var data={
                                msg: msg,
                                from: localStorage.getItem("wpChatId"), //from:true means received msg else sent msg
                                name:localStorage.getItem("wpname"),
                                time: formatAMPM(new Date)
                                
                         }
                // alert("send()"+msg);
                 $scope.obj.push( {
                                msg: msg,
                                from: false, //from:true means received msg else sent msg
                                time: formatAMPM(new Date)
                                
                                    });
                 $ionicScrollDelegate.scrollBottom();
                 socket.emit("send",data);
            }

            // $scope.setUSerName = function() {
            //     // alert("userSet");
            //     socket.on(localStorage.getItem("wpChatId"), function(data) {
            //         if (data.type == 'msg') {
            //             $scope.msg.push(data.content);
            //             $scope.$apply();
            //             socket.emit('receivedAck', "received");
            //             //                        console.log("ack sent back : received");
            //         } else if (data.type == 'ack') {
            //             //                        debugger;
            //             //                         console.log("received ack") 
            //             for (i = messageArray.length - 1; i >= 0; i--) {
            //                 if (messageArray[i].id == data.content.remapId) {
            //                     messageArray[i].id = data.id;
            //                     //                                alert("matched");
            //                 }
            //             }
            //             console.log("ack came: ", data.content);
            //         }
            //     })
            //     console.log("id Set " + localStorage.getItem("wpChatId"))
            // };
            // $scope.setUSerName();
            //            socket.on("receivedAck",function(data){ // console.log("received ack") // for (i = messageArray.length - 1; i >= 0; i--) { // if (messageArray[i].id == data.content.remapId) { // messageArray[i].id = data.content.remapId; // alert("matched"); // } // } // })


      

$timeout(function(){
 $ionicScrollDelegate.scrollBottom();
},500)
        $scope.scrollTop = function () {
            //            debugger;
            $scope.obj.push({
                msg: "I am fine",
                from: false,
                time: "5:30 am",
                seen: "arrived"
            });

            

            $ionicScrollDelegate.scrollBottom();
        };
        $scope.commonObj={};
        $scope.send1=function(msg){
            $scope.obj.push({
                msg: $scope.commonObj.msg,
                from: false,
                time: "5:30 am",
                seen: "arrived"
            });
        $scope.commonObj.msg="";
            $ionicScrollDelegate.scrollBottom();
        }


        //        alert("chats " + $stateParams.id);
        $scope.smileyKeyboardOffset = 150;
        $scope.width = window.innerWidth;
        $scope.height = window.innerHeight;
        $scope.alter = function () {
            $scope.obj[$scope.obj.length - 1].seen = "custom";
        }

        $scope.obj = [{
                msg: "hello from:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means recfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgeived msg else sent msg",
                from: true, //from:true means received msg else sent msg
                time: "2:40 am",
                seen: "arrived"
                        }, {
                msg: "hi",
                from: false,
                time: "12:30 pm",
                seen: "sent"
                        }, {
                msg: "where are you ?",
                from: true,
                time: "11:50 pm",
                seen: "seen"
                        }, {
                msg: "I am fine",
                from: false,
                time: "5:30 am",
                seen: "arrived"
                        },
            {
                msg: "hello from:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means recfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgeived msg else sent msg",
                from: true, //from:true means received msg else sent msg
                time: "2:40 am",
                seen: "arrived"
                        }, {
                msg: "hi hello from:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means recfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgeived msg else sent msg",
                from: false,
                time: "12:30 pm",
                seen: "sent"
                        }, {
                msg: "where are you ? hello from:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means recfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgeived msg else sent msg",
                from: true,
                time: "11:50 pm",
                seen: "seen"
                        }, {
                msg: "I am fine hello from:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means recfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgeived msg else sent msg",
                from: false,
                time: "5:30 am",
                seen: "arrived"
                        },
            {
                msg: "hello from:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means recfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgeived msg else sent msg",
                from: true, //from:true means received msg else sent msg
                time: "2:40 am",
                seen: "arrived"
                        }, {
                msg: "hi",
                from: false,
                time: "12:30 pm",
                seen: "sent"
                        }, {
                msg: "where are you ?",
                from: true,
                time: "11:50 pm",
                seen: "seen"
                        }, {
                msg: "I am fine",
                from: false,
                time: "5:30 am",
                seen: "arrived"
                        },
            {
                msg: "hello from:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means recfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgfrom:true means received msg else sent msgeived msg else sent msg",
                from: true, //from:true means received msg else sent msg
                time: "2:40 am",
                seen: "arrived"
                        }, {
                msg: "hi",
                from: false,
                time: "12:30 pm",
                seen: "sent"
                        }, {
                msg: "where are you ?",
                from: true,
                time: "11:50 pm",
                seen: "seen"
                        }, {
                msg: "I am fine",
                from: false,
                time: "5:30 am",
                seen: "arrived"
                        }];






        //        debugger;
    })







   
.controller('verifyOTPCtrl', ['$scope','$state','$http', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$http, $stateParams) {
console.log($stateParams.email);
     $scope.verifyOTP = function(otp) {
         var email=$stateParams.email;
          alert("otp"+email);
            $http({
                url: "http://localhost:3000/verifyOTP",
                method: "GET",
                params: {
                    email: email,
                    otp: otp
                }
            }).then(function(res) {
                console.log(res.data);
                if (res.data.id) {
                    localStorage.setItem("wpChatId", res.data.id);
                    $scope.userAuthentication = true;
                    $state.go("tabsController.chatExpanded");
                } else {
                    localStorage.setItem("wpChatId", -1);
                    $scope.userAuthentication = false;
                    alert("Error111");
                }
            });
        }

}])
 