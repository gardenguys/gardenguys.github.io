var actualTotalPrice = 0;
function calculatePrice() {

  var durationOfVisit = document.getElementById("durationOfVisit").value;
  var lessThanHalfDayPrice = 550;
  var halfDayPrice = 850;
  var fullDayPrice = 1500;

  // Set actualTotalPrice based on selected options
if (durationOfVisit == "lessThanHalfDay") {
    actualTotalPrice = lessThanHalfDayPrice;
  } else if (durationOfVisit === "halfDay") {
    actualTotalPrice = halfDayPrice;
  } else if (durationOfVisit === "fullDay") {
    actualTotalPrice = fullDayPrice;
  }
  document.getElementById("actualTotalPrice").textContent =
    "₹ " + Math.round(actualTotalPrice);
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
    // Display the selected values in the popup and style them as green
    $("#selectedDurationOfVisitText").html(
      "Duration of Visit: <strong>" + durationOfVisit + "</strong>"
    );
    $("#discountedTotalPriceModal").html(
      "Total: <strong>₹ " + actualTotalPrice + "</strong>"
    );
    // Set hidden form values
    $("#selectedDurationOfVisitTextHid").val(durationOfVisit);
    $("#discountedTotalPriceModalHid").val(actualTotalPrice);

    // Show the popup
    $("#confirmationModal").modal("show");
  });
});

// Dynamically display blogs in the page
// Function to create a Bootstrap 4 card
function createCard(title, subtitle, postMeta, href, imageUrl) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-3", "mx-3", "border", "shadow");
  imageUrl = "https://gardenguys.in/" + imageUrl;
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");
  cardImage.src = imageUrl;
  cardImage.style.width = "100%"; // Set fixed width
  cardImage.style.height = "200px"; // Set fixed height
  card.appendChild(cardImage);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitleLink = document.createElement("a");
  cardTitleLink.classList.add("card-title", "h4", "text-dark");
  cardTitleLink.textContent = title;
  cardTitleLink.href = href;

  const cardSubtitle = document.createElement("h5");
  cardSubtitle.classList.add("card-subtitle", "my-2", "text-muted");
  cardSubtitle.textContent = subtitle;

  cardBody.appendChild(cardTitleLink);
  cardBody.appendChild(cardSubtitle);

  card.appendChild(cardBody);

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer");
  cardFooter.textContent = postMeta;
  card.appendChild(cardFooter);

  return card;
}

// Fetch and display latest blogs
const blogURL = "https://gardenguys.in/blog/";

const cardContainer = document.getElementById("blog-card-container");

fetch(blogURL)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const blogDoc = parser.parseFromString(data, "text/html");
    const latestBlogs = blogDoc.querySelectorAll(".post-preview-link");

    let blogCount = 0;

    latestBlogs.forEach((blog) => {
      if (blogCount < 3) {
        const title = blog.querySelector(".post-title").textContent;
        const subtitle = blog.querySelector(".post-subtitle").textContent;
        const postMetaElement = blog.querySelector(".post-meta"); // Select the <p> element
        const postMetaText = postMetaElement.textContent; // Get the content from the <p> element
        const postMetaParts = postMetaText.trim().split("\n"); // Split the content by new lines

        // Extract the relevant information
        // const postedBy = postMetaParts[2].trim();
        // const date = postMetaParts[5].trim();
        // const readTime = postMetaParts[7].trim();

        const href = blog.getAttribute("href"); // Get the href attribute from the <a> element

        // Fetch the linked blog post to get the image URL
        fetch(`https://gardenguys.in${href}`)
          .then((response) => response.text())
          .then((blogData) => {
            const blogParser = new DOMParser();
            const linkedBlogDoc = blogParser.parseFromString(
              blogData,
              "text/html"
            );
            const headerStyle = linkedBlogDoc
              .querySelector(".masthead")
              .getAttribute("style"); // Get the style attribute of the header
            const imageUrl = extractImageUrlFromHeaderStyle(headerStyle); // Extract the image URL

            const card = createCard(
              title,
              subtitle,
              postMetaText,
              href,
              imageUrl
            ); // Pass the image URL to the createCard function
            card.classList.add("flex-grow-1", "mx-2", "flex-shrink-1"); // Adjust card spacing
            cardContainer.appendChild(card);
          })
          .catch((error) =>
            console.error("Error fetching linked blog post:", error)
          );
      }
      blogCount++;
    });
  })
  .catch((error) => console.error("Error fetching blogs:", error));

function extractImageUrlFromHeaderStyle(style) {
  const urlRegex = /url\(['"]?(.*?)['"]?\)/;
  const matches = style.match(urlRegex);
  if (matches && matches.length > 1) {
    return matches[1];
  }
  return null;
}
