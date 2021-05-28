
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var thisIsvar=6;

$(".next").click(function(){
	if(animating) return false;
    var inputName = document.getElementsByName("userName")[0];
    var location = document.getElementsByName("location")[0];
    var theProblem = document.getElementsByName("theProblem")[0];
    
        if (inputName.value == ""||location.value == ""||theProblem.va=="") {
            alert("חסר פרטים");
        }
        else
        {
            
        
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
    }
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
    updateFireBase();
	return false;
});



function printFromFireBase(){
    var firebaseConfig = {
        apiKey: "AIzaSyAV7qKtGKxWihRDWKHeIaP-0fEGGhpwU5M",
        authDomain: "mrbin-68ee4.firebaseapp.com",
        projectId: "mrbin-68ee4",
        storageBucket: "mrbin-68ee4.appspot.com",
        messagingSenderId: "676759233035",
        appId: "1:676759233035:web:a810849e018f2262e0dd0e",
        measurementId: "G-JHS2RZXFE1"
      };

      firebase.initializeApp(firebaseConfig);
      var firestore = firebase.firestore();

      const db = firestore.collection("Data");

      db.get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


    
}


function updateFireBase (){
    var firebaseConfig = {
        apiKey: "AIzaSyAV7qKtGKxWihRDWKHeIaP-0fEGGhpwU5M",
        authDomain: "mrbin-68ee4.firebaseapp.com",
        projectId: "mrbin-68ee4",
        storageBucket: "mrbin-68ee4.appspot.com",
        messagingSenderId: "676759233035",
        appId: "1:676759233035:web:a810849e018f2262e0dd0e",
        measurementId: "G-JHS2RZXFE1"
      };



      firebase.initializeApp(firebaseConfig);
      var firestore = firebase.firestore();

      const db = firestore.collection("Data");

      var inputName = document.getElementsByName("userName")[0];
      var location = document.getElementsByName("location")[0];
      var theProblem = document.getElementsByName("theProblem")[0];
      var email = document.getElementsByName("email")[0];
      var phoneNumber = document.getElementsByName("phoneNumber")[0];

      let userNameInput = inputName.value;
      let locationInput = location.value;
      let messageInput = theProblem.value;
      let emailInput = email.value;
      let phoneNumberInput = phoneNumber.value;
      

      db.add
      (
        {
            name: userNameInput,
            location: locationInput,
            message: messageInput,
            email: emailInput,
            phoneNumber: phoneNumberInput
        }
      ).then(function(docRef){
          thisIsvar=docRef.id;
          console.log("we addd with this Id:", docRef.id);

      }).catch(function(error){
          console.log("something is wrong with this Id:", docRef.id);
      });


      function done(){

        alert("fuckkkkkk");
        window.location.href = "https://itamarshubin.github.io/testingsite/progress.html?key="+docRef.id
      }


    //   db.doc().set({
    //       name: userNameInput,
    //       location: locationInput,
    //       massage: massageInput,
    //       email: emailInput,
    //       phoneNumber: phoneNumberInput
    //   }).then(function(){
    //       console.log("that shit should work");
    //   }).catch(function(error){
    //       console.log(error);
    //   });

      return 0;
}