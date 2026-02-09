// get form and message elements
const form = document.getElementById("documentForm");
const message = document.getElementById("message");

// listen for form submit
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // stop page reload

  console.log("FORM SUBMITTED"); // debug

  // collect form data
  const data = {
    clientRef: document.getElementById("clientRef").value,
    type: document.getElementById("type").value,
    fileName: document.getElementById("fileName").value,
    content: document.getElementById("content").value
  };

  try {
    // SEND DATA TO BACKEND
    const response = await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    message.textContent = result.message || "Document submitted successfully";
    form.reset();
  } catch (error) {
    console.error(error);
    message.textContent = "Error submitting document";
  }
});
