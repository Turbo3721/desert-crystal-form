exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the form data
    const formData = JSON.parse(event.body);
    
    // Prepare data for Google Sheets
    const response = await fetch('https://script.google.com/macros/s/AKfycbxtdtRdAr3agy3l2iaXuDDw0svWXlWKdIa_jdpC6_mrYmOHxdQGcq50UFMfig6xyLZ-/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Sheets');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Order submitted successfully!" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to submit order", error: error.message })
    };
  }
};