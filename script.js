var DISCOUNTED_PRICE = 0;

function calculatePrice() {
  var durationOfVisit = document.getElementById("durationOfVisit").value;
  var frequencyOfVisit = document.getElementById("frequencyOfVisit");
  var durationOfSubscription = document.getElementById(
    "durationOfSubscription"
  ).value;

  var actualPrice = 0;
  var discount = 25;
  var freq = 1;
  var duration = 1;

  // Set actualPrice based on selected options
  if (durationOfVisit == "lessThanHalfDay") {
    actualPrice =  597.33;
  } else if (durationOfVisit === "halfDay") {
    actualPrice = 930.67;
  } else if (durationOfVisit === "fullDay") {
    actualPrice = 1197.33;
  }

  // Calculate the actual total price
  var actualTotalPrice = actualPrice;

  // Reset the "Frequency of Visit" options if "Single visit" is selected as the duration of contract
  if (durationOfSubscription === "singleVisit") {
    frequencyOfVisit.disabled = true;

    if (frequencyOfVisit.options[0].value !== "onceAMonth") {
      var onceAMonthOption = new Option("Once a month", "onceAMonth");
      onceAMonthOption.id = "onceAMonth"; // Set the id attribute
      frequencyOfVisit.options.add(onceAMonthOption, 0); // Add at the beginning
    }
    // Disable the "Frequency of Visit" options
    frequencyOfVisit.selectedIndex = 0;
    freq = 1;
    duration = 1;
  } else {
    // Enable the "Frequency of Visit" options
    frequencyOfVisit.disabled = false;
  }

  // Dynamically add or remove "Once a month" option based on subscription duration
  if (durationOfSubscription === "oneMonth") {
    if (frequencyOfVisit.options[0].value === "onceAMonth") {
      frequencyOfVisit.options[0].remove(); // Remove "Once a month" option
    }
    freq = 2;
  } else {
    // Add "Once a month" option if it doesn't exist
    if (frequencyOfVisit.options[0].value !== "onceAMonth") {
      var onceAMonthOption = new Option("Once a month", "onceAMonth");
      onceAMonthOption.id = "onceAMonth"; // Set the id attribute
      frequencyOfVisit.options.add(onceAMonthOption, 0); // Add at the beginning
    }
  }

  // Calculate the discounted total price
  if (frequencyOfVisit.value === "onceAMonth") {
    freq = 1;
  } else if (frequencyOfVisit.value === "twiceAMonth") {
    freq = 2;
  } else if (frequencyOfVisit.value === "fourTimesAMonth") {
    freq = 4;
  }

  // Adjust discounted total price based on contract duration
  if (durationOfSubscription === "oneMonth") {
    duration = 1;
  } else if (durationOfSubscription === "threeMonths") {
    duration = 3;
    discount += 5;
  } else if (durationOfSubscription === "sixMonths") {
    duration = 6;
    discount += 10;
  } else if (durationOfSubscription === "twelveMonths") {
    duration = 12;
    discount += 15;
  }

  document.getElementById("actualTotalPrice").style.display = "inline";
  document.getElementById("totalDiscount").style.display = "inline";
  document.getElementById("realCostPerVisit").style.display = "inline";

  actualTotalPrice = actualPrice * freq * duration;

  var discountedPrice = actualTotalPrice - actualTotalPrice * (discount / 100);
  DISCOUNTED_PRICE = Math.round(discountedPrice);

  var effectiveCostPerVisit = Math.round(discountedPrice / (freq * duration));

  document.getElementById("discountedTotalPrice").textContent =
    "₹ " + Math.round(discountedPrice);
  document.getElementById("actualTotalPrice").textContent =
    "₹ " + Math.round(actualTotalPrice);
  document.getElementById("totalDiscount").textContent =
    "✨ " + Math.round(discount) + "% saved";

  document.getElementById("effectiveCostPerVisit").textContent =
    "₹ " + Math.round(effectiveCostPerVisit);
  document.getElementById("realCostPerVisit").textContent = "₹ " +  Math.round(actualPrice);
}

// Automatically calculate and populate the total prices when the form is changed
var form = document.getElementById("packageCalculatorForm");
form.addEventListener("change", calculatePrice);

// Trigger the initial calculation on page load
calculatePrice();

// JavaScript code to handle the button click and display the popup

$(document).ready(function () {
  $("#hireGardenerBtn").click(function () {
    // Get selected values from the form
    const durationOfVisit = $("#durationOfVisit option:selected").text();
    const durationOfSubscription = $(
      "#durationOfSubscription option:selected"
    ).text();
    const frequencyOfVisit = $("#frequencyOfVisit option:selected").text();

    // Display the selected values in the popup and style them as green
    $("#selectedDurationOfVisitText").html(
      "Duration of Visit: <strong>" + durationOfVisit + "</strong>"
    );
    $("#selecteddurationOfSubscriptionText").html(
      "Duration of Contract: <strong>" + durationOfSubscription + "</strong>"
    );
    $("#selectedFrequencyOfVisitText").html(
      "Frequency of Visit: <strong>" + frequencyOfVisit + "</strong>"
    );
    $("#discountedTotalPriceModal").html(
      "Total: <strong>" + DISCOUNTED_PRICE + "</strong>"
    );

    // Set hidden form values

    $("#selectedDurationOfVisitTextHid").val(durationOfVisit);
    $("#selecteddurationOfSubscriptionTextHid").val(durationOfSubscription);
    $("#selectedFrequencyOfVisitTextHid").val(frequencyOfVisit);
    $("#discountedTotalPriceModalHid").val(DISCOUNTED_PRICE);

    // Show the popup
    $("#confirmationModal").modal("show");
  });
});
