var firebaseConfig = {
  apiKey: "AIzaSyDwRRrtX6o7_vszkx-iFYsvKIcUJytzgXQ",
  authDomain: "mrbin-bd0b7.firebaseapp.com",
  databaseURL: "https://mrbin-bd0b7-default-rtdb.firebaseio.com",
  projectId: "mrbin-bd0b7",
  storageBucket: "mrbin-bd0b7.appspot.com",
  messagingSenderId: "723872622971",
  appId: "1:723872622971:web:1fa55f56c03eaecd0175de",
  measurementId: "G-9QREQ80PQ0"
};



$('.button').click(function(){

  var $btn = $(this),
      $step = $btn.parents('.modal-body'),
      stepIndex = $step.index(),
      $pag = $('.modal-header span').eq(stepIndex);

  if(stepIndex === 0 || stepIndex === 1) { step1($step, $pag); }
  else { step3($step, $pag); }
  
});


function step1($step, $pag){
console.log('step1');
  // animate the step out
  $step.addClass('animate-out');
  
  // animate the step in
  setTimeout(function(){
    $step.removeClass('animate-out is-showing')
         .next().addClass('animate-in');
    $pag.removeClass('is-active')
          .next().addClass('is-active');
  }, 600);
  
  // after the animation, adjust the classes
  setTimeout(function(){
    $step.next().removeClass('animate-in')
          .addClass('is-showing');
    
  }, 1200);
}


function step3($step, $pag){
console.log('3');

  // animate the step out
  $step.parents('.modal-wrap').addClass('animate-up');

  setTimeout(function(){
    $('.rerun-button').css('display', 'inline-block');
  }, 300);
}

$('.rerun-button').click(function(){
 $('.modal-wrap').removeClass('animate-up')
                  .find('.modal-body')
                  .first().addClass('is-showing')
                  .siblings().removeClass('is-showing');

  $('.modal-header span').first().addClass('is-active')
                          .siblings().removeClass('is-active');
 $(this).hide();
});
