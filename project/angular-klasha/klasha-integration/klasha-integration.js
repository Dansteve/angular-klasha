// var klashaClient = null;
var message = "";
businessId = 1;
//console.log("The local version: 7");
function KlashaClient(
  merchantKey,
  businessId,
  amount,
  containerId,
  callbackUrl,
  countryCode,
  sourceCurrency,
  kit
) {
  /*  $.get("https://oloyedeolad.github.io/online-asset/halawee-integration.css", function (data) {
        this.modalStyle = data;
        //console.log(this.modalStyle)
    });*/

  jQuery("head").append(
    /*jQuery(
      '<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">'
    ),*/
    /* jQuery('<link rel="stylesheet" type="text/css" />').attr(
      "href",
      "http://localhost/gate/wgatek.css"
    ),*/
    jQuery('<link rel="stylesheet" type="text/css" />').attr(
      "href",
      "https://klastatic.fra1.cdn.digitaloceanspaces.com/test/css/wgatek.css"
    ),
    /*      jQuery('<link rel="stylesheet" type="text/css" />').attr(
          "href",
          "http://192.168.64.2/test-gate/css/wgatek.css"
        ),
        jQuery('<link rel="stylesheet" type="text/css" />').attr(
          "href",
          "<link href="https://klastatic.fra1.cdn.digitaloceanspaces.com/test/css/tet.css" rel="stylesheet">"
        ),*/

    /*  jQuery('<link rel="stylesheet" type="text/css" />').attr(
          "href",
          "http://localhost/gate/wgatek.css"
      ),*/
    /* jQuery('<link rel="stylesheet" type="text/css" />').attr(
          "href",
          "https://klastatic.fra1.cdn.digitaloceanspaces.com/test/css/tet.css"
        ),*/
    jQuery(
      '<script src="https://klastatic.fra1.cdn.digitaloceanspaces.com/css/stomp.js"></script>'
    ),
    jQuery(
      '<script src="https://klastatic.fra1.cdn.digitaloceanspaces.com/css/cleave.js"></script>'
    )
  );
  var firstResult = [];
  //console.log("COuntry code", countryCode)
  this.klashaBaseUrl = "https://ktests.com/";
  //this.klashaBaseUrl = "https://gate.klasapps.com/";
  this.paymentUrl = this.klashaBaseUrl + "pay/" + countryCode + "/cardpayment";

  //this.IframeUrl = "http://192.168.64.2/test-gate/views/merchant-integration.html";
  //this.IframeUrl = "http://localhost/gate/views/merchant-integration.html"
  this.IframeUrl =
    "https://klastatic.fra1.digitaloceanspaces.com/test/html/html/merchant-integration.html";
  /*<<<<<<< HEAD
  //this.IframeUrl = "http://192.168.64.2/test-gate/views/merchant-integration.html";
  //this.IframeUrl = "http://localhost/gate/views/merchant-integration.html"
  this.IframeUrl = "https://klastatic.fra1.digitaloceanspaces.com/test/html/html/merchant-integration.html";
=======
  this.IframeUrl = "http://192.168.64.3/test-gate/views/merchant-integration.html";
  //this.IframeUrl = "http://localhost/gate/views/merchant-integration.html"
  //this.IframeUrl = "https://klastatic.fra1.digitaloceanspaces.com/test/html/html/merchant-integration.html";
>>>>>>> a4094175b69486a4a7b6b8baeed4c82965d49d63*/
  this.merchantKey = merchantKey;
  this.containerId = containerId;
  this.callbackUrl = callbackUrl;
  this.modalStyle = "";
  this.amount = amount;
  this.bearerToken = "";
  this.error = false;
  this.failedMessage = "";
  this.convertedAmount = "";
  this.localCurrency = "";
  this.details = kit;
  this.details["businessId"] = businessId;
  this.details["merchantKey"] = merchantKey;
  this.details["amount"] = amount;
  this.details["currency"] = countryCode;
  this.details["redirect_url"] = "https://dashboard.klasha.com/woocommerce";
  kit["businessId"] = businessId;
  // kit["amount"] = amount;
  kit["currency"] = countryCode;
  kit["redirect_url"] = "https://dashboard.klasha.com/woocommerce";
  var convertedRate = 0;

  this.init = function () {
    klashaClient = this;
    //console.log("source currency", sourceCurrency)
    jQuery.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
      },
      url: this.klashaBaseUrl + "nucleus/exchange/",
      data: JSON.stringify({
        amount: this.amount,
        sourceCurrency: sourceCurrency,
        email: kit["email"],
        phone: kit["phone"],
        destinationCurrency: countryCode,
      }),
      dataType: "json",
      method: "POST",
      context: this,
      success: function (data) {
        convertedRate = data["amount"];
        this.convertedAmount = convertedRate / 100;
        kit["amount"] = this.convertedAmount.toString();
        kit["sourceAmount"] = this.amount;
        this.localCurrency = data["destinationCurrency"];
        this.details["rate"] = data["rate"];
        this.details["sourceCurrency"] = sourceCurrency;
        this.processPayment();
      },
    });
  };

  let iframeHeight = "520px";

  this.processPayment = function () {
    //console.log( JSON.stringify(this.details))
    // var _data = JSON.parse(JSON.stringify(data));
    //console.log(kit);
    //console.log(this.details);
    iframeHTML =
      "<iframe " +
      " src='" +
      this.IframeUrl +
      "?amount=" +
      this.convertedAmount.toFixed(2).toString() +
      "&currency=" +
      this.localCurrency +
      "&sourceCurrency=" +
      sourceCurrency +
      "&countryCode=" +
      countryCode +
      "&merchantKey=" +
      btoa(merchantKey) +
      "&details=" +
      btoa(JSON.stringify(this.details)) +
      "&call=" +
      btoa(this.details["callBack"]) +
      "&kit=" +
      btoa(JSON.stringify(kit)) +
      `' width = '700px' referrerpolicy='no-referrer' height=${iframeHeight} name='win' id='win'>`;

    // sandbox='allow-top-navigation allow-popups-to-escape-sandbox allow-same-origin allow-popups allow-scripts allow-forms allow-modals'
    //myIframe.contentDocument.body.prepend(newFormHtml);
    modalHTML =
      `<div id='myModal' class='modal'>
        <div style='height: 100%; width: 100%;  display: none' id='kneedirect'></div>
        <div id="kspec" class='payment-container'>


        ` +
      iframeHTML +
      "<div style='height: 100%; width: 100%;  display: none' id='kneedirect'></div>" +
      "</div></div>";

    specialModal = `<div id='myModal' class='modal'> </div>`;

    //console.log(this.details["callBack"]);
    try {
      if (document.getElementById("terms").checked) {
        jQuery("#" + this.containerId).append(modalHTML);
        jQuery(".site").css("overflow-y", "hidden");
        jQuery(document.body).css("overflow-y", "hidden");
        jQuery(document.body).toggleClass("special-cls");
        jQuery(".loader-container").css("display", "none");
      } else {
        alert("Please accept the terms and condition");
        return;
      }
    } catch {
      jQuery("#" + this.containerId).append(modalHTML);
      jQuery(".site").css("overflow-y", "hidden");
      jQuery(document.body).css("overflow-y", "hidden");
      jQuery(document.body).toggleClass("special-cls");
      jQuery(".loader-container").css("display", "none");
    }

    jQuery("#myModal").css("display", "block");
    jQuery("#myModal").css("background", "#FEFEFE");
    var modal = document.getElementById("myModal");
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    console.log("I got here");

    return false;
  };

  /*  window.addEventListener('message', function (event) {


    /!*alert(`Received ${event.data} from ${event.origin}`);*!/
    if (event.origin === "https://klastatic.fra1.cdn.digitaloceanspaces.com") {
      if (event.data === 'close') {
        console.log(`Received ${event.data} from ${event.origin}`);
        jQuery(".site").css("overflow-y", "visible");
        jQuery(document.body).css("overflow-y", "visible");
        jQuery(document.body).toggleClass("special-cls");
        //jQuery(document.body).css("overflow-x", "visible");
        //jQuery(document.body).css("overflow-y", "visible");
        jQuery("#myModal").css("display", "none");

        //console.log("I tried to display back");
        jQuery("html, body").animate({scrollTop: 0}, "fast");
      }


      return false;
      console.log("I already got into the listener 1");
    }
    //console.log(event.data);

  })*/

  /* this.pet = jQuery(document).click(function(e) {
    console.log(e.target);
    jQuery("#myModal").css("display", "none");
    jQuery(document.body).css("overflow-y", "visible");
    jQuery(document.body).toggleClass("special-cls");
    //jQuery(document.body).css("overflow-x", "visible");
  });*/

  this.closeModal = function () {
    jQuery("#myModal").css("display", "none");
    //window.location = client.callbackUrl + "?status=2";
  };

  //jQuery("#kcancel").click(closeModal());
  // var klashaBaseUrl = "https://ktests.com/pay/";
  // var klashaBaseUrl = "http://localhost:7701/pay/";
  //var klashaBaseUrl = "https://gate.klasapps.com/";

  flwTestResultDomain = "https://ravemodal-dev.herokuapp.com";
  window.addEventListener("message", function (event) {
    console.log(
      "received: " + JSON.stringify(event.data) + "from: " + event.origin
    );
    /* var flwData = event.data;
    if (event.origin === flwTestResultDomain) {
      if (event.data !== undefined && event.data !== null) {
        jQuery.ajax({
          beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("x-auth-token", merchantKey);
          },
          type: "post",
          url: klashaBaseUrl + countryCode + "/redirectcallback",
          data: JSON.stringify(event.data),
          dataType: "json",
          method: "POST",
          success: function (data) {

          },
          error: function (err) {
            console.log("I have an error, i could not send it");
          }
        })
      }
      var reportData = {
        "status": flwData.transactionobject.status,
        "tx_ref": flwData.transactionobject.txRef,
        "processor_response": flwData.transactionobject.acctvalrespmsg
      }
      if (flwData.chargeResponseCode === "00"  && flwData.status === "successful") {
        console.log("payment is successful")
      } else {
        console.log("payment failed")
      }

      var methodToCall = kit["callBack"];
      jQuery(document.body).css("overflow-y", "visible");
      jQuery(document.body).toggleClass("special-cls");
      //jQuery(document.body).css("overflow-x", "visible !important");
      jQuery("#myModal").css("display", "none");
      // var frame = document.getElementById("win");
      // frame.parentNode.removeChild(frame);
      //console.log("I already got into the listener 2")
      console.log(reportData)
      methodToCall(reportData);
    }

    if (event.data['link'] !== undefined ) {
      console.log("am trying to hide it");
      document.getElementById("")

      var element = document.getElementById("win")
      //element.parentNode.removeChild(element);

      element.src = event.data['link'];
      element.load(function () {
        console.log("loaded")
      })

    }*/
    if (event.data === "resize") {
      var iFrameID = document.getElementById("win");
      iFrameID.height = "800";

      return;
    } else if (
      event.origin === "https://klastatic.fra1.digitaloceanspaces.com" &&
      event.data !== "close"
    ) {
      var methodToCall = kit["callBack"];
      jQuery(document.body).css("overflow-y", "visible");
      jQuery(document.body).toggleClass("special-cls");
      //jQuery(document.body).css("overflow-x", "visible !important");
      jQuery("#myModal").css("display", "none");
      // var frame = document.getElementById("win");
      // frame.parentNode.removeChild(frame);
      //console.log("I already got into the listener 2")
      methodToCall(event.data);
    }

    return false;
    // can message back using event.source.postMessage(...)
  });
  /*window.onmessage = function(e){
    console.log(e.data);
    if (e.data == 'hello') {
      console.log("its working");
      alert('It works!');
    }
  };*/

  window.onresize = function (event) {
    console.log(jQuery(window).width());
    if (jQuery(window).width() <= 500) {
      var iFrameID = document.getElementById("win");
      iFrameID.height = "100%";
    } else {
      var iFrameID = document.getElementById("win");
      iFrameID.height = "520px";
    }
  };

  window.KlashaClient = KlashaClient;
}
