# Google Sheets Waitlist Setup

## Step 1: Prepare Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1tippFlpk8z703jjHDgYrE_XoWOVX89JFCGyEZ3RquHM/edit
2. Make sure you have a sheet named **"Waitlist"**
3. Add headers in Row 1:
   - A1: **Timestamp**
   - B1: **Name**
   - C1: **Email**

## Step 2: Create Google Apps Script Web App

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and the "Waitlist" sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Waitlist');
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Waitlist sheet not found'
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Append the data as a new row
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function
function testPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: 'Test User',
        email: 'test@example.com'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

## Step 3: Deploy the Web App

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "Waitlist Form Handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project name] (unsafe)**
   - Click **Allow**
7. **Copy the Web app URL** (it will look like: `https://script.google.com/macros/s/AKfycby.../exec`)

## Step 4: Add the URL to Your Environment Variables

1. Create or update `.env.local` in your project root:

```bash
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. Replace `YOUR_SCRIPT_ID` with the URL you copied in Step 3

## Step 5: Restart Your Development Server

```bash
npm run dev
```

## Testing

1. Go to your waitlist page: http://localhost:3000/waitlist
2. Fill in the form and submit
3. Check your Google Sheet - you should see a new row with the timestamp, name, and email

## Troubleshooting

### "Configuration error"
- Make sure `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` is set in your `.env.local`
- Restart your dev server after adding the environment variable

### "Failed to submit"
- Check that the Google Apps Script is deployed with "Anyone" access
- Verify the Web app URL is correct
- Check the Apps Script execution logs: **Apps Script** → **Executions**

### Data not appearing in sheet
- Make sure the sheet is named exactly "Waitlist" (case-sensitive)
- Check that headers are in row 1: Timestamp, Name, Email
- View Apps Script logs for error details

## Optional Enhancements

### Add Email Notifications
Add this to your Apps Script to get notified of new signups:

```javascript
function doPost(e) {
  // ... existing code ...
  
  // After successful append
  MailApp.sendEmail({
    to: 'your-email@example.com',
    subject: '🎉 New Waitlist Signup',
    body: `Name: ${data.name}\nEmail: ${data.email}\nTime: ${data.timestamp}`
  });
  
  // ... return success ...
}
```

### Add Timestamp Formatting
The timestamp is in ISO format. To make it more readable in Sheets, you can format column A:
1. Select column A
2. **Format** → **Number** → **Date time**
