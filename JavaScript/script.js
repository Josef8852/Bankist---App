'use strict' ; 

/* DOM */

let welcomeMessage = document.querySelector('.welcome') ; 

let user = document.querySelector('.user') ; 

let password = document.querySelector('.pass') ; 

let date = document.querySelector('.date')  ;

let list = document.querySelector('.list')

let time = document.querySelector('.time') ; 

let totalAmount = document.querySelector('.money') ; 

let transferTo = document.querySelector('.trans') ;

let transAmount = document.querySelector('.transAmount') ; 

let submitTransfer = document.querySelector('.submitTransfer') ; 

let loan = document.querySelector('.loanAmount') ; 

let submitLoan = document.querySelector('.takeLoan') ; 

let closeUser = document.querySelector('.closeUser') ; 

let closePass = document.querySelector('.closePass') ; 

let closeSubmit = document.querySelector('.delete')

let moneyIn = document.querySelector('.in') ; 

let moneyOut = document.querySelector('.out') ; 

let interest = document.querySelector('.interest') ; 

let sort = document.querySelector('.sort') ; 

let timer = document.querySelector('.timer') ; 

let form = document.querySelector('.login') ; 

let submit = document.querySelector('.sub') ; 

let balance = document.querySelector('.balance') ; 

let data = document.querySelector('.data') ;




let firstUser = {

  Name: 'josef' , 

  pass: 1111 , 

  interestRate : 1.2 , 

  movements : [1300 , 79.97 , -133.90 , -642.21 , 25000 , -306.50 , 455.23 , 200] ,

  closed : false  

} ;



let secondUser = {

  Name: 'john' , 

  pass: 2222 , 

  interestRate : 1.5 , 

  movements : [1500 , -200 , 6523 , -860 , 30000 , 380.50 , -560.23 , -256.56] , 

  closed : false

} ;


 let checkUser = (User) => {


  let today = new Date();
  
  
  let dd = String(today.getDate()).padStart(2, '0');
  
  let mm = String(today.getMonth() + 1).padStart(2, '0'); 
  
  let yyyy = today.getFullYear();
  
  
  let currentDate = dd + '/' + mm + '/' + yyyy; 


  let totalIn = 0 , totalOut = 0 ; 

  if(!User.closed) {
    balance.style.display = 'block'  ;

    data.style.display = 'block' ;
  } 


  user.value = '' ; 
  
  password.value = '' ; 

  welcomeMessage.textContent = 'Good Evening , ' + User.Name.charAt(0).toUpperCase() + User.Name.slice(1) ; 


  for(let i = 0  ; i < User.movements.length ; i++) {
  if(User.movements[i] < 0) {
    let withHtml = ` 
    <p class="state wi">
    <span class="withdraw">Withdraw</span> 
    <span >${currentDate}</span> 
    <span class="value with" >${User.movements[i]} € </span> 
    </p>` ; 

    list.insertAdjacentHTML('afterbegin' , withHtml) ;

    totalOut += Math.abs(User.movements[i]) ; 
  }
  else{

    let depHtml = ` 
    <p class="state de">
    <span class="deposit">Deposit</span> 
    <span >${currentDate}</span> 
    <span class="value dep" >${User.movements[i]} € </span> 
    </p>` ; 

    list.insertAdjacentHTML('afterbegin' , depHtml)  ;

    totalIn += User.movements[i] ; 
  }


  }


  totalAmount.textContent = Math.floor(totalIn - totalOut)  ; 

  moneyIn.textContent = Math.floor(totalIn) + ' €' ; 

  moneyOut.textContent = Math.floor(totalOut) + ' €' ; 

  interest.textContent = Math.floor(totalIn * (User.interestRate / 100))  + ' €'; 

   

}


/* Delete all child elements */

let deleteAll = () => {
  let allChilds = document.querySelectorAll('.state') ; 
  for(let i = 0 ; i < allChilds.length ; i++) {
    list.removeChild(allChilds[i]) ; 
  }
}

let current  ;

let check = () => {


  if(user.value == firstUser.Name && password.value == firstUser.pass && !firstUser.closed) {
    deleteAll() ; 
    checkUser(firstUser)  ; 
    current = 'first' ; 
  }
  
  else if(user.value == secondUser.Name && password.value == secondUser.pass && !secondUser.closed ) {
    deleteAll() ; 
    checkUser(secondUser) ; 
    current = 'second' ; 
  }
}

/* Date & Time */

let dateTime = () => {
  
  let today = new Date();


  let dd = String(today.getDate()).padStart(2, '0');

  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

  let yyyy = today.getFullYear();


  date.textContent = dd + '/' + mm + '/' + yyyy; 

  /* Time */

  let hours = String(today.getHours()).padStart(2 , '0') ; 

  let minutes =  String(today.getMinutes()).padStart(2 , '0')  ; 
  
  time.textContent = hours + ':' + minutes ; 
}

let totalMinutes = 9 , seconds = 59 , bool = true ; 

let countdownTimer = () => {
  setInterval(Timer , 1000) ;  
}

let hide = () => {
  balance.style.display = 'none'  ;

  data.style.display = 'none' ; 
}

/* Countdown Timer */

let Timer = () => {
  timer.textContent = String(totalMinutes).padStart(2 , 0) + ':' + String(seconds).padStart(2 , '0') ; 
  
  seconds--  ;

   if(seconds === 0 && totalMinutes >= 1) {
      totalMinutes-- ; 
      seconds = 59 ; 
      }


    if(totalMinutes === 0 && seconds === 0) {

        hide() ; 

        welcomeMessage.textContent = 'Log in to get started' ; 

        clearInterval(countdownTimer) ;

        totalMinutes = 9 , seconds = 59 ; 
    }
}

/* Login */

submit.addEventListener('click' , function (e) {

  
  e.preventDefault(); /* prevent form from submitting */

  check() ; 

  dateTime()  ;

  if(bool) {

    countdownTimer() ; 

    bool = false ; 
  }

  else {
   
    totalMinutes = 9 , seconds = 59  ;
  }

}) ; 


closeSubmit.addEventListener('click' , (e) => {

e.preventDefault()  ;
        
if(closeUser.value == firstUser.Name && closePass.value == firstUser.pass) {
  hide() ; 
  firstUser.closed = true ; 
}

else if(closeUser.value == secondUser.Name && closePass.value == secondUser.pass ) {
  hide() ; 
  secondUser.closed = true ; 
}
        
closeUser.value = '' ;
closePass.value = '' ; 
     
 }); 


 let sorted = false ; 

/* Sort based on operation type */

 sort.addEventListener('click' , () => {
 
 let sortWithdraw = document.querySelectorAll('.wi') ; 

 if(!sorted) {
  for(let i = 0 ; i < sortWithdraw.length ; i++) {
    sortWithdraw[i].style.order = '2' ; 
   }
   sorted = true ; 
 }
 else {
  sorted = false ; 
  for(let i = 0 ; i < sortWithdraw.length ; i++) {
   sortWithdraw[i].style.order = 'initial' ; 
  }
 }

 }) ;

 /* take loan */

 let addLoanTranfer = (User ,value) => {
  User.movements.push(Number(value)) ; 
  setTimeout(() => {

    deleteAll() ; 

    checkUser(User) ; 

  } , 2000) ; 
 }


 submitLoan.addEventListener('click' , (e) => {

  e.preventDefault() ; 
  
  if(loan.value > 0) {

    if(current === 'first') {
        addLoanTranfer(firstUser , loan.value)  ;
    }
    else {
      addLoanTranfer(secondUser , loan.value) ; 
    }

  }   

  loan.value = ''  ;
  
}) ; 




submitTransfer.addEventListener('click' ,(e) => {

e.preventDefault() ;

if(transAmount.value > 0) {

  if(current === 'first' && transferTo.value == 'john') {
    addLoanTranfer(secondUser ,Number(transAmount.value))  ;

    addLoanTranfer(firstUser ,Number((transAmount.value)*(-1)))  ;

    transferTo.value = '' ; 

    transAmount.value = '' ; 
  }

  else if(current === 'second' && transferTo.value == 'josef'){
  addLoanTranfer(firstUser , transAmount.value) ; 

  addLoanTranfer(secondUser ,Number((transAmount.value)*(-1)))  ;

  transferTo.value = '' ; 

  transAmount.value = '' ; 
  }

  
}

});


