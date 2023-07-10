
$(document).ready(function () {
  var curraccount;
  var selectedAccount;
  $.get('/getAccounts', function (response) {
    console.log("get acc");
    for(let i = 0; i < response.length; i++){
      curraccount = response[i];
      $('#options').append("<option value='"+curraccount+"'>"+curraccount+"</option>");
    }
  })

  $('#submit').click(function () {
    console.log("click submit");
    selectedAccount = $('#options').val();
    console.log(selectedAccount);
    $.post('/getBalance', {account : selectedAccount}, function (response) {
      $('.select').removeClass("active");
      $('.send').addClass("active");
      $('#account').text(selectedAccount);
      $('#balance').text(response[0]);
      var current_account_index = response[1].indexOf(selectedAccount);
      response[1].splice(current_account_index,1); //remove the selected account from the list of accounts you can send to.
      $('#all-accounts').addClass("active");
      var list= $('#all-accounts > ol');
      for(let i=0;i< response[1].length;i++){
        li="<li>"+response[1][i]+"</li>";
        list.append(li)
      }


    })
  })

  $('#send').click(function () {
    console.log("click send");
    $('#status').text("Sending...");
    let amount = $('#amount').val();
    let receiver = $('#receiver').val();
    $.post('/sendCoin', {amount : amount, sender : selectedAccount, receiver : receiver}, function (response) {
      $('#balance').text(response);
      $('#status').text("Sent!!");
    })
  });


  $('#sendBalanse').click(function () {
    console.log("clisk sendBalanse")

    $.get('/getAllBalanse', function (response) {
      console.log('get balanse')
      console.log('get balanse response - ' + response)
      for (let i = 0; i < response.length; i++) {
        console.log(response[i])
      }
    })
  });

  $('#sendCoin').click(function () {
    console.log("click sendCoin");
    $('#status').text("Sending Coin...");
    let account = $('#account').val();
    let toAdress = $('#receiver').val();
    console.log('account - ' + account + ' | ' + 'toAdress - ' + ' | ' + toAdress)
    $.post('/getTransactions', {account : account, toAdress : toAdress}, function (response) {
      $('#balance').text(response);
      $('#status').text("Sent Coin!!");
    })
  });

  $('#test').click(function () {
    console.log("test");
    $('#status').text("test...");
    $.get('/sendCoinUser', function (response) {
      // $('#balance').text(response);
      // $('#status').text("Sent Coin!!");
    })
  });
  
  $('#redb').click(function () {    
    $('#status').text("drop...");
    $.get('/getReDB', function (response) {
      $('#status').text("DB is dropped!!");
    })
    $('#status').text("Create DB");
  });

  $('#redbt').click(function () {    
    $('#status').text("drop...");
    $.get('/getReDBtransaction', function (response) {
      $('#status').text("DB is dropped!!");
    })
    $('#status').text("Create DB");
  });

})
